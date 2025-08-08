import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const getPreferredLanguage = (req) => {
  return req.headers["accept-language"]?.split(",")[0]?.split("-")[0] || "en";
};

const formatOlfactoryExam = (data) => {
  const exam = {
    "eid": data?.eid,
    "intensity": data.intensity,
    "complexity": data.complexity,
    "quality": data.quality,
    "description": {
      "aromatic": data.aromatic,
      "vinous": data.vinous,
      "floral": data.floral,
      "fruity": data.fruity,
      "grassy": data.grassy,
      "mineral": data.mineral,
      "fragrant": data.fragrant,
      "spicy": data.spicy,
      "toasted": data.toasted,
      "ethereal": data.ethereal,
    },
    "notes": data.notes
  }
  return exam;
}

const formatTasting = (tasting) => {
  if (tasting.visual_exams) {
    delete tasting.visual_exams?.id;
    delete tasting.visual_exams?.tid;
  }
  if (tasting.olfactory_exams) {
    delete tasting.olfactory_exams?.id;
    delete tasting.olfactory_exams?.tid;
  }
  if (tasting.taste_olfactory_exams) {
    delete tasting.taste_olfactory_exams?.id;
    delete tasting.taste_olfactory_exams?.tid;
  }
  if (tasting.final_considerations) {
    delete tasting.final_considerations?.id;
    delete tasting.final_considerations?.tid;
  }
  const tastingFormatted = {
    tid: tasting.tid,
    full_name: tasting.full_name,
    wine_category_name: tasting.wine_categories?.code || null,
    favorite: tasting.favorite,
    sample_number: tasting.sample_number || null,
    wine_denomination: tasting.wine_denomination,
    winemaker: tasting.winemaker,
    alcohol_content: `${tasting.alcohol_content}%`,
    vintage: tasting.vintage,
    wine_temperature: `${tasting.wine_temperature}°C`,
    ambient_temperature: `${tasting.ambient_temperature}°C`,
    tasting_date: tasting.tasting_date,
    tasting_time: tasting.tasting_time,
    tasting_location: tasting.tasting_location,
    created_at: tasting.created_at,
    updated_at: tasting.updated_at,
    visual_exam: tasting.visual_exams || {},
    olfactory_exam: tasting.olfactory_exams ? formatOlfactoryExam(tasting.olfactory_exams) : {},
    taste_olfactory_exam: tasting.taste_olfactory_exams || {},
    final_considerations: tasting.final_considerations || {}
  }
  return tastingFormatted;
}

const findWineCategoryId = async (code) => {
  const category = await prisma.wine_categories.findUnique({
    where: { code },
    select: { id: true },
  });
  return category?.id || null;
};


const parseTastingTime = (tasting_time) => {
  const [hour, minute] = tasting_time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
}

export {
  getPreferredLanguage,
  formatTasting,
  formatOlfactoryExam,
  findWineCategoryId,
  parseTastingTime
}
