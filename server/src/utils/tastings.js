import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const formatOldOlfactoryExam = data => {
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

const formatNewOlfactoryExam = data => {
	const exam = {
		eid: data?.eid,
		intensity: data.intensity,
		complexity: data.complexity,
		quality: data.quality,
		description: {
			aromatic: data.aromatic,
			floral: data.floral,
			spicy: data.spicy,
			varietal: data.varietal,
			vegetal: data.vegetal,
			baking: data.baking,
			fruity: data.fruity,
			fragrant: data.fragrant,
			empyreumatic: data.empyreumatic,
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
	if (data.visual_exams_old || data.visual_exams_new) {
		delete data.visual_exams_old?.id;
		delete data.visual_exams_new?.id;
		delete data.visual_exams_old?.tid;
		delete data.visual_exams_new?.tid;
	}
	if (data.olfactory_exams_old || data.olfactory_exams_new) {
		delete data.olfactory_exams_old?.id;
		delete data.olfactory_exams_new?.id;
		delete data.olfactory_exams_old?.tid;
		delete data.olfactory_exams_new?.tid;
	}
	if (data.taste_olfactory_exams_old || data.taste_olfactory_exams_new) {
		delete data.taste_olfactory_exams_old?.id;
		delete data.taste_olfactory_exams_new?.id;
		delete data.taste_olfactory_exams_old?.tid;
		delete data.taste_olfactory_exams_new?.tid;
	}
	if (data.final_considerations_old || data.final_considerations_new) {
		delete data.final_considerations_old?.id;
		delete data.final_considerations_new?.id;
		delete data.final_considerations_old?.tid;
		delete data.final_considerations_new?.tid;
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
		new: data.new,
		visual_exam: data.visual_exams_old || data.visual_exams_new || {},
		olfactory_exam:
			(data.olfactory_exams_old && formatOldOlfactoryExam(data.olfactory_exams_old)) ||
			(data.olfactory_exams_new && formatNewOlfactoryExam(data.olfactory_exams_new)) ||
			{},
		taste_olfactory_exam: data.taste_olfactory_exams_old || data.taste_olfactory_exams_new || {},
		final_considerations: data.final_considerations_old || data.final_considerations_new || {},
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
	formatTasting,
	findWineCategoryId,
	formatOldOlfactoryExam,
	formatNewOlfactoryExam,
	formatScoringEvaluation,
};
