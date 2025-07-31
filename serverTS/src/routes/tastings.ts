import { Router, Request, Response } from "express";
import {
  getPreferredLanguage,
  formatTasting,
  injectWineCategoryName,
  findWineCategoryId,
  parseTastingTime
} from "../utils/tastings.js";
import { PrismaClient, tastings } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

// Extend Express Request to include `user`
interface AuthRequest extends Request {
  user: {
    uid: string;
    [key: string]: any;
  };
}

// GET /api/v1/tastings
router.get("/", async (req: AuthRequest, res: Response) => {
  const uid = req.user.uid;
  const language = getPreferredLanguage(req);

  try {
    const result = await prisma.tastings.findMany({
      where: { uid },
      include: {
        visual_exams: true,
        olfactory_exams: true,
        taste_olfactory_exams: true,
        final_considerations: true
      },
      orderBy: { id: "desc" }
    });

    if (!result || result.length === 0) {
      return res.status(404).json({ error: `No tastings found for user ${uid}` });
    }

    const tastingsWithNames = await injectWineCategoryName(result, language, prisma);
    const tastings = tastingsWithNames.map(t => formatTasting(t, language));

    res.json({ tastings });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET /api/v1/tastings/:tid
router.get("/:tid", async (req: AuthRequest, res: Response) => {
  const uid = req.user.uid;
  const tid = req.params.tid;
  const language = getPreferredLanguage(req);

  try {
    const result = await prisma.tastings.findUnique({
      where: { tid, uid },
      include: {
        visual_exams: true,
        olfactory_exams: true,
        taste_olfactory_exams: true,
        final_considerations: true
      }
    });

    if (!result) {
      return res.status(404).json({ error: `Tasting ${tid} not found` });
    }

    const [tastingWithName] = await injectWineCategoryName([result], language, prisma);
    const tasting = formatTasting(tastingWithName, language);
    res.json(tasting);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST /api/v1/tastings
router.post("/", async (req: AuthRequest, res: Response) => {
  const uid = req.user.uid;
  const language = req.headers["accept-language"]?.split(",")[0]?.toLowerCase() || "en";

  try {
    const {
      full_name,
      wine_category_name,
      sample_number,
      wine_denomination,
      alcohol_content,
      vintage,
      wine_temperature,
      ambient_temperature,
      tasting_date,
      tasting_time,
      tasting_location
    } = req.body as {
      full_name: string;
      wine_category_name: string;
      sample_number: string;
      wine_denomination: string;
      alcohol_content: string | number;
      vintage: string;
      wine_temperature: string | number;
      ambient_temperature: string | number;
      tasting_date: string;
      tasting_time: string;
      tasting_location: string;
    };

    const wine_category_id = await findWineCategoryId(wine_category_name, language);
    if (!wine_category_id) {
      return res.status(400).json({
        error: `No wine category found for name '${wine_category_name}' in '${language}' or 'en'.`
      });
    }

    const timeDate = parseTastingTime(tasting_time);

    const newTasting = await prisma.tastings.create({
      data: {
        uid,
        full_name,
        wine_category_id,
        sample_number,
        wine_denomination,
        alcohol_content: parseFloat(alcohol_content as string),
        vintage,
        wine_temperature: parseFloat(wine_temperature as string),
        ambient_temperature: parseFloat(ambient_temperature as string),
        tasting_date: new Date(tasting_date),
        tasting_time: timeDate,
        tasting_location
      }
    });

    const tasting = formatTasting(newTasting);
    res.status(201).json(tasting);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
