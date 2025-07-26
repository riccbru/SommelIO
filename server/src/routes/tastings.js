import { Router } from "express";
import {
    getPreferredLanguage,
    formatTasting,
    injectWineCategoryName
} from "../utils/tastings.js";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/",
    async (req, res) => {
        const uid = req.user.uid;
        const language = getPreferredLanguage(req);

        try {
            const result = await prisma.tastings.findMany({
                where: { uid: uid }
            });

            if (!result || result.length === 0) {
                res.status(404).json({ error: `No tastings found for user ${uid}` });
                return;
            }

            const tastingsWithNames = await injectWineCategoryName(result, language, prisma);
            const tastings = tastingsWithNames.map(t => formatTasting(t, language));

            res.json({ tastings: tastings });

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
);


router.get("/:tid",
    async (req, res) => {
        const uid = req.user.uid;
        const tid = req.params.tid;
        const language = getPreferredLanguage(req);
        try {
            
            const result = await prisma.tastings.findUnique(
                { where : {
                    tid: tid,
                    uid: uid
                }}
            );

            if (!result) {
                res.status(404).json({ error: `Tasting ${tid} not found` });
                return;
            }

            const [tastingWithName] = await injectWineCategoryName([result], language, prisma);
            const tasting = formatTasting(tastingWithName, language);
            res.json(tasting);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

export default router;

