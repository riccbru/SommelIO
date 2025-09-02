import { Router } from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/users/me
router.get("/me", async (req, res) => {
	try {
		const user = await prisma.users.findUnique({ where: { uid: req.user.uid } });
		if (!user) {
			res.status(404).json({ error: `User ${req.user.uid} not found` });
			return;
		}

		const payload = {
			admin: user?.admin,
			premium: user?.premium,
			username: user?.username,
			full_name: user?.full_name,
			email: user?.email,
			uid: user?.uid,
			image_url: user?.image_url,
		};

		res.json(payload);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error?.meta?.message || "Internal server error" });
	}
});

// GET /api/v1/users/me/stats
router.get("/me/stats", async (req, res) => {
	try {
		const user = await prisma.users.findUnique({ where: { uid: req.user.uid } });
		if (!user) {
			res.status(404).json({ error: `User ${req.user.uid} not found` });
			return;
		}

		const totalTastings = await prisma.tastings.count({
			where: { uid: req.user.uid },
		});

		const favoriteTastings = await prisma.tastings.count({
			where: {
				uid: req.user.uid,
				favorite: true,
			},
		});

		const ratedTastings = await prisma.tastings.count({
			where: {
				uid: req.user.uid,
			},
		});

		const payload = {
			stats: {
				totalTastings: totalTastings,
				ratedTastings: ratedTastings,
				favoriteTastings: favoriteTastings,
			},
		};

		res.json(payload);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error?.meta?.message || "Internal server error" });
	}
});

// GET /api/v1/users/:uid
router.get("/:uid", async (req, res) => {
	const uid_req = req.user.uid;
	const uid_params = req.params.uid;

	try {
		if (uid_req !== uid_params) {
			res.status(403).json({ error: "You can only access your own user data" });
			return;
		}

		const user = await prisma.users.findUnique({ where: { uid: uid_params } });
		if (!user) {
			res.status(404).json({ error: `User ${uid_params} not found` });
			return;
		}

		const payload = {
			username: user?.username,
			full_name: user?.full_name,
			uid: user?.uid,
			image_url: user?.image_url,
		};

		res.json(payload);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error?.meta?.message || "Internal server error" });
	}
});

// GET /api/v1/users/:uid/stats
router.get("/:uid/stats", async (req, res) => {
	try {
		const requesterUid = req.user.uid;
		const targetUid = req.params.uid;

		if (requesterUid === targetUid) {
			return res.status(400).json({ error: "Use /me/stats for your own stats" });
		}

		const targetUser = await prisma.users.findUnique({ where: { uid: targetUid } });
		if (!targetUser) {
			return res.status(404).json({ error: `User ${targetUid} not found` });
		}

		const relation = await prisma.colleagues.findFirst({
			where: {
				status: { not: "blocked" },
				OR: [
					{ requester_id: requesterUid, addressee_id: targetUid },
					{ requester_id: targetUid, addressee_id: requesterUid },
				],
			},
		});

		if (!relation) {
			return res.status(403).json({ error: `This user is not available` });
		}

		const totalTastings = await prisma.tastings.count({
			where: { uid: targetUid },
		});

		const favoriteTastings = await prisma.tastings.count({
			where: { uid: targetUid, favorite: true },
		});

		const ratedTastings = await prisma.tastings.count({
			where: { uid: targetUid },
		});

		const payload = {
			user: {
				admin: targetUser.admin,
				premium: targetUser.premium,
				username: targetUser.username,
				full_name: targetUser.full_name,
				email: targetUser.email,
				uid: targetUser.uid,
				image_url: targetUser.image_url,
			},
			stats: {
				totalTastings,
				ratedTastings,
				favoriteTastings,
			},
		};

		res.json(payload);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: error?.meta?.message || "Internal server error" });
	}
});

export default router;
