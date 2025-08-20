import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const getPreferredLanguage = req => {
	return req.headers["accept-language"]?.split(",")[0]?.split("-")[0] || "en";
};

const formatOlfactoryExam = data => {
	const exam = {
		eid: data?.eid,
		intensity: data.intensity,
		complexity: data.complexity,
		quality: data.quality,
		description: {
			aromatic: data.aromatic,
			vinous: data.vinous,
			floral: data.floral,
			fruity: data.fruity,
			grassy: data.grassy,
			mineral: data.mineral,
			fragrant: data.fragrant,
			spicy: data.spicy,
			toasted: data.toasted,
			ethereal: data.ethereal,
		},
		notes: data.notes,
	};
	return exam;
};

const formatScoringEvaluation = data => {
	const scoring = {
		sid: data?.sid,
		visual_appearance: data.visual_appearance,
		visual_color: data.visual_color,
		olfactory_intensity: data.olfactory_intensity,
		olfactory_complexity: data.olfactory_complexity,
		olfactory_quality: data.olfactory_quality,
		taste_structure: data.taste_structure,
		taste_balance: data.taste_balance,
		taste_intensity: data.taste_intensity,
		taste_persistence: data.taste_persistence,
		taste_quality: data.taste_quality,
		harmony: data.harmony,
		total_score: data.total_score,
		notes: data.notes,
	};
	return scoring;
};

const formatTasting = data => {
	if (data.visual_exams) {
		delete data.visual_exams?.id;
		delete data.visual_exams?.tid;
	}
	if (data.olfactory_exams) {
		delete data.olfactory_exams?.id;
		delete data.olfactory_exams?.tid;
	}
	if (data.taste_olfactory_exams) {
		delete data.taste_olfactory_exams?.id;
		delete data.taste_olfactory_exams?.tid;
	}
	if (data.final_considerations) {
		delete data.final_considerations?.id;
		delete data.final_considerations?.tid;
	}
	const tasting = {
		tid: data.tid,
		full_name: data.full_name,
		wine_category_name: data.wine_categories?.code || null,
		favorite: data.favorite,
		sample_number: data.sample_number || null,
		wine_denomination: data.wine_denomination,
		winemaker: data.winemaker,
		alcohol_content: `${data.alcohol_content}%`,
		vintage: data.vintage,
		wine_temperature: `${data.wine_temperature}°C`,
		ambient_temperature: `${data.ambient_temperature}°C`,
		tasting_date: data.tasting_timestamp.toISOString().split("T")[0],
		tasting_time: data.tasting_timestamp.toISOString().split("T")[1].substring(0, 5),
		tasting_location: data.tasting_location,
		created_at: data.created_at,
		updated_at: data.updated_at,
		visual_exam: data.visual_exams || {},
		olfactory_exam: data.olfactory_exams ? formatOlfactoryExam(data.olfactory_exams) : {},
		taste_olfactory_exam: data.taste_olfactory_exams || {},
		final_considerations: data.final_considerations || {},
		scoring_evaluation: data.scoring_evaluation
			? formatScoringEvaluation(data.scoring_evaluation)
			: {},
	};
	return tasting;
};

const findWineCategoryId = async code => {
	const category = await prisma.wine_categories.findUnique({
		where: { code },
		select: { id: true },
	});
	return category?.id || null;
};

export {
	getPreferredLanguage,
	formatTasting,
	formatOlfactoryExam,
	formatScoringEvaluation,
	findWineCategoryId,
};
