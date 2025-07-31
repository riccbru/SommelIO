import { PrismaClient, tastings } from "../generated/prisma";
import { Request } from "express";

const prisma = new PrismaClient();

type TastingWithRelations = tastings & {
  visual_exams?: Record<string, any> | null;
  olfactory_exams?: Record<string, any> | null;
  taste_olfactory_exams?: Record<string, any> | null;
  final_considerations?: Record<string, any> | null;
  wine_category_name?: string | null;
};

// Get preferred language from Accept-Language header
const getPreferredLanguage = (req: Request): string => {
  return req.headers["accept-language"]?.split(",")[0]?.split("-")[0] || "en";
};

// Clean up and format a single tasting object
const formatTasting = (tasting: TastingWithRelations) => {
  if (tasting.visual_exams) {
    delete tasting.visual_exams.id;
    delete tasting.visual_exams.tid;
  }
  if (tasting.olfactory_exams) {
    delete tasting.olfactory_exams.id;
    delete tasting.olfactory_exams.tid;
  }
  if (tasting.taste_olfactory_exams) {
    delete tasting.taste_olfactory_exams.id;
    delete tasting.taste_olfactory_exams.tid;
  }
  if (tasting.final_considerations) {
    delete tasting.final_considerations.id;
    delete tasting.final_considerations.tid;
  }

  return {
    tid: tasting.tid,
    uid: tasting.uid,
    full_name: tasting.full_name,
    wine_category_name: tasting.wine_category_name || null,
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
    final_considerations: tasting.final_considerations || {},
  };
};

// Build a translator function for wine category names
const fetchWineCategoryNames = async (
  categoryIds: number[],
  language: string,
  prisma: PrismaClient
): Promise<(categoryId: number) => string | null> => {
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

  const translationMap: Record<number, Record<string, string>> = {};
  for (const t of translations) {
    if (!translationMap[t.category_id]) {
      translationMap[t.category_id] = {};
    }
    translationMap[t.category_id][t.language_code] = t.name;
  }

  return (categoryId: number) =>
    translationMap[categoryId]?.[language] ||
    translationMap[categoryId]?.["en"] ||
    null;
};

// Add translated wine_category_name to each tasting object
const injectWineCategoryName = async (
  tastings: (TastingWithRelations & { wine_category_id: number })[],
  language: string,
  prisma: PrismaClient
): Promise<TastingWithRelations[]> => {
  const categoryIds = [...new Set(tastings.map((t) => t.wine_category_id))];
  const getName = await fetchWineCategoryNames(categoryIds, language, prisma);

  return tastings.map(({ wine_category_id, ...rest }) => ({
    ...rest,
    wine_category_name: getName(wine_category_id),
  }));
};

// Find category_id from wine name and language
const findWineCategoryId = async (
  name: string,
  language: string
): Promise<number | null> => {
  let category = await prisma.wine_category_translations.findFirst({
    where: {
      name: { equals: name, mode: "insensitive" },
      language_code: language,
    },
    select: { category_id: true },
  });

  if (!category) {
    category = await prisma.wine_category_translations.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        language_code: "en",
      },
      select: { category_id: true },
    });
  }

  return category?.category_id || null;
};

// Convert tasting_time string to Date object with time
const parseTastingTime = (tasting_time: string): Date => {
  const [hour, minute] = tasting_time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
};

export {
  getPreferredLanguage,
  formatTasting,
  injectWineCategoryName,
  findWineCategoryId,
  parseTastingTime,
};
