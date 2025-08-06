import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const getPreferredLanguage = (req) => {
  return req.headers["accept-language"]?.split(",")[0]?.split("-")[0] || "en";
};

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
    uid: tasting.uid,
    full_name: tasting.full_name,
    wine_category_name: tasting.wine_category_name || null,
    favorite: tasting.favorite,
    sample_number: tasting.sample_number || null,
    wine_denomination: tasting.wine_denomination,
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
    olfactory_exam: tasting.olfactory_exams || {},
    taste_olfactory_exam: tasting.taste_olfactory_exams || {},
    final_considerations: tasting.final_considerations || {}
  }
  return tastingFormatted;
}

const fetchWineCategoryNames = async (categoryIds, language, prisma) => {
  const translations = await prisma.wine_category_translations.findMany({
    where: {
      category_id: { in: categoryIds },
      language_code: { in: [language, "en"] },
    },
    select: {
      category_id: true,
      language_code: true,
      name: true,
    },
  });

  const translationMap = {};
  for (const t of translations) {
    if (!translationMap[t.category_id]) {
      translationMap[t.category_id] = {};
    }
    translationMap[t.category_id][t.language_code] = t.name;
  }

  return (categoryId) =>
    translationMap[categoryId]?.[language] ||
    translationMap[categoryId]?.["en"] ||
    null;
};

const injectWineCategoryName = async (tastings, language, prisma) => {
  const categoryIds = [...new Set(tastings.map(t => t.wine_category_id))];
  const getName = await fetchWineCategoryNames(categoryIds, language, prisma);

  return tastings.map(({ id, wine_category_id, ...rest }) => ({
    ...rest,
    wine_category_name: getName(wine_category_id)
  }));
};

const findWineCategoryId = async (name, language) =>{
  let category = await prisma.wine_category_translations.findFirst({
    where: {
      name: { equals: name, mode: 'insensitive' },
      language_code: language,
    },
    select: { category_id: true },
  });
  if (!category) {
    category = await prisma.wine_category_translations.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
        language_code: 'en',
      },
      select: { category_id: true },
    });
  }
  return category?.category_id || null;
}

const parseTastingTime = (tasting_time) => {
  const [hour, minute] = tasting_time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
}

export {
  getPreferredLanguage,
  formatTasting,
  injectWineCategoryName,
  findWineCategoryId,
  parseTastingTime
}
