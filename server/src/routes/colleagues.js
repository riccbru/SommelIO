import { Router } from "express";
import formatRelationship from "../utils/colleagues.js";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/colleagues
// Get all accepted colleagues for the current user
router.get("/", async (req, res) => {
	try {
		const uid = req.user.uid;

		const result = await prisma.colleagues.findMany({
			where: {
				OR: [{ requester_id: uid }, { addressee_id: uid }],
				status: "accepted",
			},
			include: {
				users_colleagues_requester_idTousers: {
					select: {
						premium: true,
						username: true,
						full_name: true,
						uid: true,
						image_url: true,
					},
				},
				users_colleagues_addressee_idTousers: {
					select: {
						premium: true,
						username: true,
						full_name: true,
						uid: true,
						image_url: true,
					},
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});

		const colleagues = result.map(r => formatRelationship(uid, r));
		res.json({ colleagues: colleagues });
	} catch (error) {
		console.error("Error fetching colleagues:", error);
		res.status(500).json({ error: "Failed to fetch colleagues" });
	}
});

// GET /api/v1/colleagues/requests
// Get pending colleague requests
router.get("/requests", async (req, res) => {
	try {
		const uid = req.user.uid;

		const incomingRequests = await prisma.colleagues.findMany({
			where: {
				addressee_id: uid,
				status: "pending",
			},
			include: {
				users_colleagues_requester_idTousers: {
					select: {
						uid: true,
						username: true,
						full_name: true,
						premium: true,
						image_url: true,
					},
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});

		const outgoingRequests = await prisma.colleagues.findMany({
			where: {
				requester_id: uid,
				status: "pending",
			},
			include: {
				users_colleagues_addressee_idTousers: {
					select: {
						uid: true,
						username: true,
						full_name: true,
						premium: true,
						image_url: true,
					},
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});

		res.json({
			incoming: incomingRequests.map(req => ({
				username: req.users_colleagues_requester_idTousers.username,
				created_at: req.created_at,
				rid: req.rid,
				uid: req.requester_id,
				image_url: req.users_colleagues_requester_idTousers.image_url,
			})),
			outgoing: outgoingRequests.map(req => ({
				username: req.users_colleagues_addressee_idTousers.username,
				created_at: req.created_at,
				rid: req.rid,
				uid: req.addressee_id,
				image_url: req.users_colleagues_addressee_idTousers.image_url,
			})),
		});
	} catch (error) {
		console.error(`Error fetching requests: ${error}`);
		res.status(500).json({ error: "Failed fetching pending requests" });
	}
});

// POST /api/v1/colleagues/:cuid
// Send colleague request
router.post("/:cuid", async (req, res) => {
	try {
		const requesterId = req.user.uid;
		const addresseeId = req.params.cuid;

		if (!addresseeId) {
			return res.status(400).json({ error: "Addressee ID is required" });
		}

		if (requesterId === addresseeId) {
			return res.status(400).json({ error: "Cannot send request to yourself" });
		}

		const addresseeExists = await prisma.users.findUnique({
			where: { uid: addresseeId },
		});

		if (!addresseeExists) {
			return res.status(404).json({ error: "User not found" });
		}

		const existingRelationship = await prisma.colleagues.findFirst({
			where: {
				OR: [
					{
						requester_id: requesterId,
						addressee_id: addresseeId,
						status: { in: ["pending", "accepted", "blocked"] },
					},
					{
						requester_id: addresseeId,
						addressee_id: requesterId,
						status: { in: ["pending", "accepted", "blocked"] },
					},
				],
			},
		});

		if (existingRelationship) {
			console.log(`Relationship already exists with status: ${existingRelationship.status}`);
			return res.status(400).json({
				error: `Relationship already exists with status: ${existingRelationship.status}`,
			});
		}

		const newRequest = await prisma.colleagues.create({
			data: {
				requester_id: requesterId,
				addressee_id: addresseeId,
				status: "pending",
			},
			include: {
				users_colleagues_addressee_idTousers: {
					select: {
						premium: true,
						username: true,
						full_name: true,
						uid: true,
					},
				},
			},
		});

		res.status(201).json({
			success: `Colleague request sent successfully to ${newRequest.users_colleagues_addressee_idTousers.username}`,
		});
	} catch (error) {
		console.error("Error sending request:", error);
		res.status(500).json({ error: "Failed to send colleague request" });
	}
});

// PUT /api/v1/colleagues/accept/:rid
// Accept colleague request
router.put("/accept/:rid", async (req, res) => {
	try {
		const uid = req.user.uid;
		const rid = req.params.rid;

		const request = await prisma.colleagues.findUnique({
			where: { rid: rid },
		});

		if (!request) {
			return res.status(404).json({ error: "Request not found" });
		}

		if (request.addressee_id !== uid) {
			return res.status(403).json({ error: "Not authorized to accept this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ error: `Request is already ${request.status}` });
		}

		const updatedRequest = await prisma.colleagues.update({
			where: { rid: rid },
			data: {
				status: "accepted",
				updated_at: new Date(),
			},
			include: {
				users_colleagues_requester_idTousers: {
					select: {
						uid: true,
						username: true,
						full_name: true,
					},
				},
			},
		});

		res.json({
			success: `Colleague request ${updatedRequest.users_colleagues_requester_idTousers.username} accepted`,
		});
	} catch (error) {
		console.error("Error accepting request:", error);
		res.status(500).json({ error: "Failed to accept colleague request" });
	}
});

// PUT /api/v1/colleagues/decline/:rid
// Decline colleague request
router.put("/decline/:rid", async (req, res) => {
	try {
		const uid = req.user.uid;
		const rid = req.params.rid;

		const request = await prisma.colleagues.findUnique({
			where: { rid: rid },
		});

		if (!request) {
			return res.status(404).json({ error: "Request not found" });
		}

		if (request.addressee_id !== uid) {
			return res.status(403).json({ error: "Not authorized to decline this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ error: `Request is already ${request.status}` });
		}

		const updatedRequest = await prisma.colleagues.update({
			where: { rid: rid },
			data: {
				status: "declined",
				updated_at: new Date(),
			},
			include: {
				users_colleagues_requester_idTousers: {
					select: {
						premium: true,
						username: true,
						full_name: true,
						uid: true,
					},
				},
			},
		});

		res.json({
			success: `Colleague request from ${updatedRequest.users_colleagues_requester_idTousers.username} declined`,
		});
	} catch (error) {
		console.error("Error declining request:", error);
		res.status(500).json({ error: "Failed to decline colleague request" });
	}
});

// PUT /api/v1/colleagues/block/:uid
// Block a user (using their UID)
router.put("/block/:uid", async (req, res) => {
	try {
		const blockerId = req.user.uid;
		const blockedId = req.params.uid;

		if (blockerId === blockedId) {
			return res.status(400).json({ error: "Cannot block yourself" });
		}

		const userExists = await prisma.users.findUnique({
			where: { uid: blockedId },
		});

		if (!userExists) {
			return res.status(404).json({ error: "User not found" });
		}

		const existingRelationship = await prisma.colleagues.findFirst({
			where: {
				OR: [
					{ requester_id: blockerId, addressee_id: blockedId },
					{ requester_id: blockedId, addressee_id: blockerId },
				],
			},
		});

		if (existingRelationship) {
			const blocked = await prisma.colleagues.update({
				where: { rid: existingRelationship.rid },
				data: {
					requester_id: blockerId, // The blocker becomes the requester
					addressee_id: blockedId, // The blocked becomes the addressee
					status: "blocked",
					updated_at: new Date(),
				},
				include: {
					users_colleagues_addressee_idTousers: {
						select: {
							premium: true,
							username: true,
							full_name: true,
							uid: true,
						},
					},
				},
			});

			res.json({
				success: `Colleague ${blocked.users_colleagues_addressee_idTousers.username} blocked successfully`,
			});
		} else {
			const blocked = await prisma.colleagues.create({
				data: {
					requester_id: blockerId,
					addressee_id: blockedId,
					status: "blocked",
				},
				include: {
					users_colleagues_addressee_idTousers: {
						select: {
							premium: true,
							username: true,
							full_name: true,
							uid: true,
						},
					},
				},
			});

			res.json({
				success: `Colleague ${blocked.users_colleagues_addressee_idTousers.username} blocked successfully`,
			});
		}
	} catch (error) {
		console.error("Error blocking user:", error);
		res.status(500).json({ error: "Failed to block user" });
	}
});

// PUT /api/v1/colleagues/unblock/:rid
// Unblock a user
router.put("/unblock/:rid", async (req, res) => {
	try {
		const uid = req.user.uid;
		const rid = req.params.rid;

		const relationship = await prisma.colleagues.findUnique({
			where: { rid: rid },
		});

		if (!relationship) {
			return res.status(404).json({ error: "Relationship not found" });
		}

		if (relationship.requester_id !== uid) {
			return res.status(403).json({ error: "Not authorized to unblock this user" });
		}

		if (relationship.status !== "blocked") {
			return res.status(400).json({ error: "User is not blocked" });
		}

		const result = await prisma.colleagues.delete({
			where: { rid: rid },
			include: {
				users_colleagues_addressee_idTousers: {
					select: {
						premium: true,
						username: true,
						full_name: true,
						uid: true,
					},
				},
			},
		});

		res.json({
			success: `Colleague ${result.users_colleagues_addressee_idTousers.uid} unblocked successfully`,
		});
	} catch (error) {
		console.error("Error unblocking user:", error);
		res.status(500).json({ error: "Failed to unblock user" });
	}
});

// GET /api/v1/colleagues/blocked
// Get all blocked users
router.get("/blocked", async (req, res) => {
	try {
		const uid = req.user.uid;

		const blockedUsers = await prisma.colleagues.findMany({
			where: {
				requester_id: uid,
				status: "blocked",
			},
			include: {
				users_colleagues_addressee_idTousers: {
					select: {
						premium: true,
						username: true,
						full_name: true,
						uid: true,
						image_url: true,
					},
				},
			},
			orderBy: {
				updated_at: "desc",
			},
		});

		const blocked = blockedUsers.map(relationship => ({
			username: relationship.users_colleagues_addressee_idTousers.username,
			full_name: relationship.users_colleagues_addressee_idTousers.full_name,
			blocked_at: relationship.updated_at,
			rid: relationship.rid,
			uid: relationship.addressee_id,
			image_url: relationship.users_colleagues_addressee_idTousers.image_url,
		}));

		res.json({ blocked: blocked });
	} catch (error) {
		console.error(`Error fetching blocked users: ${error}`);
		res.status(500).json({ error: "Failed fetching blocked users" });
	}
});

// DELETE /api/v1/colleagues/:cuid
// Remove colleague relationship
router.delete("/:cuid", async (req, res) => {
	try {
		const uid = req.user.uid;
		const cuid = req.params.cuid;

		// Check if accepted relationship exists
		const relationship = await prisma.colleagues.findFirst({
			where: {
				OR: [
					{ requester_id: uid, addressee_id: cuid, status: "accepted" },
					{ requester_id: cuid, addressee_id: uid, status: "accepted" },
				],
			},
		});

		if (!relationship) {
			return res.status(404).json({ error: "No existing relationship found" });
		}

		// Delete the relationship
		await prisma.colleagues.delete({
			where: { rid: relationship.rid },
		});

		res.status(200).json({
			success: `Colleague ${cuid} removed successfully`,
		});
	} catch (error) {
		console.error("Error removing relationship:", error);
		res.status(500).json({ error: "Failed to remove colleague relationship" });
	}
});

// GET /api/v1/colleagues/search?q=username
// Search for users to add as colleagues
router.get("/search", async (req, res) => {
	try {
		const uid = req.user.uid;
		const name = req.query.q?.trim();

		if (!uid) return res.status(401).json({ error: "Unauthorized" });

		const relationships = await prisma.colleagues.findMany({
			where: {
				OR: [{ requester_id: uid }, { addressee_id: uid }],
			},
			select: { requester_id: true, addressee_id: true, status: true },
		});

		const userStatusMap = new Map();
		const excludeIds = new Set([uid]);

		relationships.forEach(rel => {
			const otherId = rel.requester_id === uid ? rel.addressee_id : rel.requester_id;

			if (rel.status === "accepted" || rel.status === "blocked") {
				excludeIds.add(otherId);
			}

			if (rel.status === "pending" && rel.requester_id === uid) {
				userStatusMap.set(otherId, rel.status);
			} else {
				excludeIds.add(otherId);
			}
		});

		const result = await prisma.users.findMany({
			take: 20,
			where: {
				uid: { notIn: [...excludeIds] },
				OR: [
					{ username: { contains: name, mode: "insensitive" } },
					{ full_name: { contains: name, mode: "insensitive" } },
				],
			},
			select: { uid: true, username: true, full_name: true, image_url: true },
		});

		const users = result.map(user => ({
			status: userStatusMap.get(user.uid) || null,
			...user,
		}));

		res.json(users);
	} catch (error) {
		console.error(`Error searching users: ${error}`);
		res.status(500).json({ error: "Failed searching users" });
	}
});

export default router;
