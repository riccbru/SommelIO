import { Router } from "express";
import { PrismaClient } from "../generated/prisma/index.js";
import { TastingSchema } from "../validators/tastingSchema.js";
import { formatTasting, findWineCategoryId } from "../utils/tastings.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/tastings
router.get("/", async (req, res) => {
	const uid = req.user.uid;

	try {
		const results_old = await prisma.tastings.findMany({
			where: { uid: uid, new: false },
			include: {
				wine_categories: true,
				visual_exams_old: true,
				olfactory_exams_old: true,
				taste_olfactory_exams_old: true,
				final_considerations_old: true,
				scoring_evaluation: true,
			},
		});
		const results_new = await prisma.tastings.findMany({
			where: { uid: uid, new: true },
			include: {
				wine_categories: true,
				visual_exams_new: true,
				olfactory_exams_new: true,
				taste_olfactory_exams_new: true,
				final_considerations_new: true,
				scoring_evaluation: true,
			},
		});

		const tastings_old = results_old.map(t => formatTasting(t));
		const tastings_new = results_new.map(t => formatTasting(t));

		const tastings = [...tastings_old, ...tastings_new].sort(
			(a, b) => new Date(b.tasting_date) - new Date(a.tasting_date),
		);

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
		const result_old = await prisma.tastings.findUnique({
			where: {
				tid: tid,
				uid: uid,
				new: false,
			},
			include: {
				wine_categories: true,
				visual_exams_old: true,
				olfactory_exams_old: true,
				taste_olfactory_exams_old: true,
				final_considerations_old: true,
				scoring_evaluation: true,
			},
		});
		const result_new = await prisma.tastings.findUnique({
			where: {
				tid: tid,
				uid: uid,
				new: true,
			},
			include: {
				wine_categories: true,
				visual_exams_new: true,
				olfactory_exams_new: true,
				taste_olfactory_exams_new: true,
				final_considerations_new: true,
				scoring_evaluation: true,
			},
		});

		if (!result_old && !result_new) {
			res.status(404).json({ error: `Tasting ${tid} not found` });
			return;
		}

		const tasting = formatTasting(result_old || result_new);
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

		const tastingData = {
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
			tasting_timestamp: new Date(
				Date.UTC(
					...tasting_date
						.split("-")
						.map(Number)
						.map((v, i) => (i === 1 ? v - 1 : v)),
					...tasting_time.split(":").map(Number),
					0,
				),
			).toISOString(),
			tasting_location,
		};

		if (req.body.new) {
			tastingData.new = true;
		} else {
			tastingData.new = false;
		}

		const newTasting = await prisma.tastings.create({
			data: tastingData,
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
			dataToUpdate.tasting_timestamp = new Date(
				Date.UTC(
					...req.body.tasting_date
						.split("-")
						.map(Number)
						.map((v, i) => (i === 1 ? v - 1 : v)),
					...req.body.tasting_time.split(":").map(Number),
					0,
				),
			).toISOString();
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
