import { Router } from "express";
import { formatCoefficients } from "../utils/scorings.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { ScoringSchema } from "../validators/scoringSchema.js";
import { formatScoringEvaluation } from "../utils/tastings.js";

const router = Router();
const prisma = new PrismaClient();

async function validateTastingOwnership(tid, uid, res) {
	if (!tid || tid.length !== 36) {
		return res.status(400).json({ error: `URL parameter 'tasting_uuid' is an invalid UUID-32` });
	}

	const tasting = await prisma.tastings.findUnique({ where: { tid, uid } });
	if (!tasting) {
		return res.status(404).json({ error: `Tasting ${tid} not found for user ${uid}` });
	}

	return tasting;
}

// GET /api/v1/scoring/coefficients
router.get("/coefficients", async (_req, res) => {
	try {
		const coefficients = await prisma.corrective_coefficients.findMany();
		if (coefficients.length === 0) {
			return res.status(404).json({ error: `Scoring coefficients not found` });
		}
		return res.json(formatCoefficients(coefficients));
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: `Error getting scoring coefficients` });
	}
});

// GET /api/v1/scoring/:tid
router.get("/:tid", async (req, res) => {
	const { tid } = req.params;
	const uid = req.user.uid;

	try {
		const tasting = validateTastingOwnership(tid, uid, res);
		if (!tasting) return;
		const scoring = await prisma.scoring_evaluation.findUnique({ where: { tid } });
		if (!scoring) {
			res.status(404).json({ error: `Tasting ${tid} does not have a scoring evaluation yet` });
		}
		res.json(formatScoringEvaluation(scoring));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: `Error getting scoring evaluation` });
	}
});

// POST /api/v1/scoring/:tid
router.post("/:tid", async (req, res) => {
	const { tid } = req.params;
	const uid = req.user.uid;

	const parsed = ScoringSchema.safeParse(req.body);
	if (!parsed.success) {
		const errMex = parsed.error._zod.def[0].message;
		return res.status(400).json({ error: errMex });
	}

	try {
		const tasting = validateTastingOwnership(tid, uid, res);
		if (!tasting) return;
		const newScore = await prisma.scoring_evaluation.create({
			data: {
				tastings: { connect: { tid: tid } },
				users: { connect: { uid: uid } },
				...parsed.data,
			},
		});
		res.status(201).json(formatScoringEvaluation(newScore));
	} catch (err) {
		if (err.code === "P2014") {
			return res.status(409).json({ error: `Tasting ${tid} already has a scoring evaluation` });
		}
		console.error(err);
		res.status(500).json({ error: `Error creating scoring evaluation` });
	}
});

// PUT /api/v1/scoring/:tid
router.put("/:tid", async (req, res) => {
	const { tid } = req.params;
	const uid = req.user.uid;

	const tasting = await validateTastingOwnership(tid, uid, res);
	if (!tasting) return;

	const parsed = ScoringSchema.safeParse(req.body);
	if (!parsed.success) {
		const errMex = parsed.error._zod.def[0].message;
		return res.status(400).json({ error: errMex });
	}

	try {
		const existingScoring = await prisma.scoring_evaluation.findUnique({
			where: { tid },
		});
		if (!existingScoring) {
			return res.status(404).json({ error: `Scoring evaluation not found for tasting ${tid}` });
		}
		const updatedScoring = await prisma.scoring_evaluation.update({
			where: { tid },
			data: parsed.data,
		});
		res.status(200).json(formatScoringEvaluation(updatedScoring));
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: `Error updating scoring evaluation` });
	}
});

export default router;
