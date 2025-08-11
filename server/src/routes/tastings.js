import { Router } from "express";
import { formatTasting, findWineCategoryId } from "../utils/tastings.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { TastingSchema } from "../validators/tastingSchema.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/tastings
router.get("/", async (req, res) => {
	const uid = req.user.uid;

	try {
		const result = await prisma.tastings.findMany({
			where: { uid: uid },
			include: {
				wine_categories: true,
				visual_exams: true,
				olfactory_exams: true,
				taste_olfactory_exams: true,
				final_considerations: true,
			},
			orderBy: { id: "desc" },
		});

		const tastings = result.map(t => formatTasting(t));

		res.json({ tastings: tastings });
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

// GET /api/v1/tastings/:tid
router.get("/:tid", async (req, res) => {
	const uid = req.user.uid;
	const tid = req.params.tid;
	try {
		const result = await prisma.tastings.findUnique({
			where: {
				tid: tid,
				uid: uid,
			},
			include: {
				wine_categories: true,
				visual_exams: true,
				olfactory_exams: true,
				taste_olfactory_exams: true,
				final_considerations: true,
			},
		});

		if (!result) {
			res.status(404).json({ error: `Tasting ${tid} not found` });
			return;
		}

		const tasting = formatTasting(result);
		res.json(tasting);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// POST /api/v1/tastings
router.post("/", async (req, res) => {
	const uid = req.user.uid;

	const parsed = TastingSchema.safeParse(req.body);

	if (!parsed.success) {
		console.log(parsed.error);
		const errMex = parsed.error._zod.def[0].message;
		return res.status(400).json({ error: errMex });
	}

	const {
		full_name,
		wine_category_name,
		favorite,
		sample_number,
		wine_denomination,
		winemaker,
		alcohol_content,
		vintage,
		wine_temperature,
		ambient_temperature,
		tasting_date,
		tasting_time,
		tasting_location,
	} = parsed.data;

	try {
		const wine_category_id = await findWineCategoryId(wine_category_name);
		if (!wine_category_id) {
			return res.status(400).json({
				error: `No wine category found for name '${wine_category_name}'`,
			});
		}

		const newTasting = await prisma.tastings.create({
			data: {
				uid,
				full_name,
				wine_category_id,
				favorite,
				sample_number,
				wine_denomination,
				winemaker,
				alcohol_content: parseFloat(alcohol_content),
				vintage,
				wine_temperature: parseFloat(wine_temperature),
				ambient_temperature: parseFloat(ambient_temperature),
				tasting_timestamp: new Date(`${tasting_date}T${tasting_time}`).toISOString(),
				tasting_location,
			},
			include: {
				wine_categories: true,
			},
		});

		const tasting = formatTasting(newTasting);
		res.status(201).json(tasting);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// PUT /api/v1/tastings/:tid
router.put("/:tid", async (req, res) => {
	const uid = req.user.uid;
	const tid = req.params.tid;
	if (!tid) return res.status(400).json({ error: "Missing tasting ID" });

	try {
		const tasting = await prisma.tastings.findUnique({
			where: { tid },
		});
		if (!tasting || tasting.uid !== uid) {
			return res.status(404).json({ error: "Tasting not found or unauthorized." });
		}

		const allowedFields = [
			"sample_number",
			"wine_denomination",
			"winemaker",
			"alcohol_content",
			"vintage",
			"wine_temperature",
			"ambient_temperature",
			"tasting_location",
		];

		const dataToUpdate = {};
		allowedFields.forEach(field => {
			if (field in req.body) {
				dataToUpdate[field] = req.body[field];
			}
		});

		if ("wine_category_name" in req.body) {
			const category = await prisma.wine_categories.findUnique({
				where: { code: req.body.wine_category_name },
			});

			if (!category) {
				return res.status(400).json({ error: "Invalid wine_category_name" });
			}

			dataToUpdate.wine_categories = {
				connect: { id: category.id },
			};
		}
		if ("tasting_date" in req.body && "tasting_time" in req.body) {
			dataToUpdate.tasting_timestamp = new Date(`${req.body.tasting_date}T${req.body.tasting_time}`).toISOString();

		}
		if ("vintage" in req.body) {
			const vintage = Number(req.body.vintage);
			const currentYear = new Date().getFullYear();
			if (Number.isNaN(vintage) || vintage > currentYear) {
				return res.status(400).json({ error: "Vintage year is impossible" });
			}
			dataToUpdate.vintage = vintage;
		}

		if (Object.keys(dataToUpdate).length === 0) {
			return res.status(400).json({ error: "Body is empty or no valid fields for update" });
		}
		
		const updatedTasting = await prisma.tastings.update({
			where: { tid },
			data: dataToUpdate,
		});

		res.json(formatTasting(updatedTasting));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// PATCH /api/v1/tastings/:tid
router.patch("/:tid", async (req, res) => {
	const uid = req.user.uid;
	const tid = req.params.tid;
	if (!tid) return res.status(400).json({ error: "Missing tasting ID" });
	try {
		const tasting = await prisma.tastings.findUnique({
			where: { tid },
		});
		if (!tasting || tasting.uid !== uid) {
			return res.status(404).json({ error: "Tasting not found or unauthorized." });
		}
		const updated = await prisma.tastings.update({
			where: { tid },
			data: { favorite: !tasting.favorite },
		});
		res.json(formatTasting(updated));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

// DELETE /api/v1/tastings/:tid
router.delete("/:tid", async (req, res) => {
	const uid = req.user.uid;
	const tid = req.params.tid;
	if (!tid) return res.status(400).json({ error: "Missing tasting ID" });
	try {
		const tasting = await prisma.tastings.findUnique({
			where: { tid },
		});
		if (!tasting || tasting.uid !== uid) {
			return res.status(404).json({ error: "Tasting not found or unauthorized." });
		}

		await prisma.tastings.delete({
			where: { tid },
		});

		res.json({ success: `Tasting ${tid} successfully deleted` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export default router;
