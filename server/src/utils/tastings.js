import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const getPreferredLanguage = (req) => {
  return req.headers["accept-language"]?.split(",")[0]?.split("-")[0] || "en";
};

function formatTasting (tasting) {
    const tastingFormatted = {
        tid: tasting.tid,
        uid: tasting.uid,
        full_name: tasting.full_name,
        wine_category_name: tasting.wine_category_name || null,
        wine_denomination: tasting.wine_denomination,
        alcohol_content: tasting.alcohol_content,
        vintage: tasting.vintage,
        wine_temperature: tasting.wine_temperature,
        ambient_temperature: tasting.ambient_temperature,
        tasting_date: tasting.tasting_date,
        tasting_time: tasting.tasting_time,
        tasting_location: tasting.tasting_location,
        created_at: tasting.created_at,
        updated_at: tasting.updated_at
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

export {
  getPreferredLanguage,
  formatTasting,
  injectWineCategoryName,
}
