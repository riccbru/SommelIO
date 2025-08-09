import { Router } from "express";
import {
    formatTasting,
    findWineCategoryId,
    parseTastingTime
} from "../utils/tastings.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { TastingSchema } from "../validators/tastingSchema.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/tastings
router.get("/",
    async (req, res) => {
        const uid = req.user.uid;

        try {
            const result = await prisma.tastings.findMany({
                where: { uid: uid },
                include: {
                  wine_categories: true,
                  visual_exams: true,
                  olfactory_exams: true,
                  taste_olfactory_exams: true,
                  final_considerations: true
                },
                orderBy: { id: 'desc' },
            });
            
            const tastings = result.map(t => formatTasting(t));

            res.json({ tastings: tastings });

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
);

// GET /api/v1/tastings/:tid
router.get("/:tid",
    async (req, res) => {
        const uid = req.user.uid;
        const tid = req.params.tid;
        try {
            
            const result = await prisma.tastings.findUnique({
              where : {
                    tid: tid,
                    uid: uid
                },
              include: {
                wine_categories: true,
                visual_exams: true,
                olfactory_exams: true,
                taste_olfactory_exams: true,
                final_considerations: true
              }
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
    }
);

// POST /api/v1/tastings
router.post('/', async (req, res) => {
  const uid = req.user.uid;

  const parsed = TastingSchema.safeParse(req.body);
  
  if (!parsed.success) {
    console.log(parsed.error);
    const errMex = parsed.error._zod.def[0].message;;
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
    tasting_location
  } = parsed.data;

  try {
    const wine_category_id = await findWineCategoryId(wine_category_name);
    if (!wine_category_id) {
      return res.status(400).json({
        error: `No wine category found for name '${wine_category_name}'`,
      });
    }

    const timeDate = parseTastingTime(tasting_time);

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
        tasting_date: new Date(tasting_date),
        tasting_time: timeDate,
        tasting_location,
      },
      include: {
        wine_categories: true
      }
    });

    const tasting = formatTasting(newTasting);
    res.status(201).json(tasting);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PATCH /api/v1/tastings/:tid
router.patch('/:tid',
  async (req, res) => {
    const uid = req.user.uid;
    const tid = req.params.tid;
    if (!tid) return res.status(400).json({ error: 'Missing tasting ID' });
    try {
      const tasting = await prisma.tastings.findUnique({
        where: { tid },
      });
      if (!tasting || tasting.uid !== uid) {
        return res.status(404).json({ error: 'Tasting not found or unauthorized.' });
      }
      const updated = await prisma.tastings.update({
        where: { tid },
        data: { favorite: !tasting.favorite },
      });
      res.json(formatTasting(updated));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.delete('/:tid',
  async (req, res) => {
    const uid = req.user.uid;
    const tid = req.params.tid;
    if (!tid) return res.status(400).json({ error: 'Missing tasting ID' });
    try {
      const tasting = await prisma.tastings.findUnique({
        where: { tid },
      });
      if (!tasting || tasting.uid !== uid) {
        return res.status(404).json({ error: 'Tasting not found or unauthorized.' });
      }

      await prisma.tastings.delete({
        where: { tid },
      });

      res.json({ success: `Tasting ${tid} successfully deleted` })

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

export default router;