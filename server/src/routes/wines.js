import { Router } from "express";
import { formatWine } from "../utils/wines.js";
import { WineSchema } from "../validators/wineSchema.js";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
	const uid = req.user.uid;
	try {
		const result = await prisma.to_drink.findMany({
			where: { uid: uid },
			orderBy: { id: "desc" },
		});

		const wines = result.map(w => formatWine(w));

		res.json({ wines: wines });
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.get("/:wid", async (req, res) => {
	const uid = req.user.uid;
	const { wid } = req.params;
	try {
		const result = await prisma.to_drink.findUnique({
			where: {
				wid: wid,
				uid: uid,
			},
		});

		if (!result) {
			res.status(404).json({ error: `Wine ${wid} not found` });
			return;
		}

		const wine = formatWine(result);
		res.json(wine);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.post("/", async (req, res) => {
	const uid = req.user.uid;

	const parsed = WineSchema.safeParse(req.body);

	if (!parsed.success) {
		console.log(parsed.error);
		const errMex = parsed.error._zod.def[0].message;
		return res.status(400).json({ error: errMex });
	}

	const { denomination, winemaker, vintage } = parsed.data;

	try {
		const result = await prisma.to_drink.create({
			data: {
				uid: uid,
				denomination,
				winemaker,
				vintage,
			},
		});

		const newWine = formatWine(result);

		res.json(newWine);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

router.delete("/:wid", async (req, res) => {
	const { uid } = req.user;
	const { wid } = req.params;
	if (!wid) return res.status(400).json({ error: "Missing wine ID" });
	try {
		const wine = await prisma.to_drink.findUnique({
			where: {
				wid: wid,
				uid: uid,
			},
		});

		if (!wine || wine.uid !== uid) {
			return res.status(404).json({ error: "Wine not found" });
		}

		await prisma.to_drink.delete({
			where: { wid },
		});
		res.json({ success: `Wine ${wid} successfully deleted` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default router;
