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
					},
				},
				users_colleagues_addressee_idTousers: {
					select: {
						premium: true,
						username: true,
						full_name: true,
						uid: true,
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

		// Get incoming requests (requests sent TO current user)
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
					},
				},
			},
			orderBy: {
				created_at: "desc",
			},
		});

		// Get outgoing requests (requests sent BY current user)
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
			})),
			outgoing: outgoingRequests.map(req => ({
				username: req.users_colleagues_addressee_idTousers.username,
				created_at: req.created_at,
				rid: req.rid,
				uid: req.addressee_id,
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

		// Check if addressee exists
		const addresseeExists = await prisma.users.findUnique({
			where: { uid: addresseeId },
		});

		if (!addresseeExists) {
			return res.status(404).json({ error: "User not found" });
		}

		const existingRelationship = await prisma.colleagues.findFirst({
			where: {
				OR: [
					{ requester_id: requesterId, addressee_id: addresseeId },
					{ requester_id: addresseeId, addressee_id: requesterId },
					{ status: "blocked" },
				],
			},
		});

		if (existingRelationship) {
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

		// Find the request and verify the current user is the addressee
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

		// Accept the request
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

		// Find the request and verify the current user is the addressee
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

		// Decline the request
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

		// Check if user exists
		const userExists = await prisma.users.findUnique({
			where: { uid: blockedId },
		});

		if (!userExists) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if relationship exists
		const existingRelationship = await prisma.colleagues.findFirst({
			where: {
				OR: [
					{ requester_id: blockerId, addressee_id: blockedId },
					{ requester_id: blockedId, addressee_id: blockerId },
				],
			},
		});

		if (existingRelationship) {
			// Update existing relationship
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
			// Create new blocking relationship
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

		// Find the blocking relationship
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

		// Remove the blocking relationship
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
			success: `Colleague ${result.users_colleagues_addressee_idTousers.username} unblocked successfully`,
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
					},
				},
			},
			orderBy: {
				updated_at: "desc",
			},
		});

		res.json({
			blocked: blockedUsers.map(relationship => ({
				rid: relationship.rid,
				user: relationship.addressee_id,
				blocked_at: relationship.updated_at,
			})),
		});
	} catch (error) {
		console.error(`Error fetching blocked users: ${error}`);
		res.status(500).json({ error: "Failed fetching blocked users" });
	}
});

// DELETE /api/v1/colleagues/:rid
// Remove colleague relationship
router.delete("/:rid", async (req, res) => {
	try {
		const uid = req.user.uid;
		const rid = req.params.rid;

		// Find the relationship and verify the current user is involved
		const relationship = await prisma.colleagues.findUnique({
			where: { rid: rid, status: "accepted" },
		});

		if (!relationship) {
			return res.status(404).json({ error: "Relationship not found" });
		}

		if (relationship.requester_id !== uid && relationship.addressee_id !== uid) {
			return res.status(403).json({ error: "Not authorized to remove this relationship" });
		}

		// Delete the relationship
		await prisma.colleagues.delete({
			where: { rid: rid },
		});

		res.status(200).json({
			success: `Colleague ${relationship.addressee_id} removed successfully`,
		});
	} catch (error) {
		console.error(`Error removing relationship: ${error}`);
		res.status(500).json({ error: "Failed to remove colleague relationship" });
	}
});

// GET /api/v1/colleagues/search?q=username
// Search for users to add as colleagues
router.get("/search", async (req, res) => {
	try {
		const uid = req.user.uid;
		const name = req.query.q.trim();

		if (!uid) return res.status(401).json({ error: "Unauthorized" });

		const existingRelationships = await prisma.colleagues.findMany({
			where: {
				OR: [
					{ requester_id: uid },
					{ addressee_id: uid },
					{ status: "accepted" },
					{ status: "blocked" },
				],
			},
			select: { requester_id: true, addressee_id: true },
		});

		const excludeIds = new Set([uid]);
		existingRelationships.forEach(rel => {
			const otherId = rel.requester_id === uid ? rel.addressee_id : rel.requester_id;
			excludeIds.add(otherId);
		});

		const users = await prisma.users.findMany({
			where: {
				uid: { notIn: [...excludeIds] },
				OR: [
					{ username: { contains: name, mode: "insensitive" } },
					{ full_name: { contains: name, mode: "insensitive" } },
				],
			},
			select: { premium: true, username: true, full_name: true, uid: true },
			take: 20,
		});

		res.json(users);
	} catch (error) {
		console.error(`Error searching users: ${error}`);
		res.status(500).json({ error: "Failed searching users" });
	}
});

export default router;
