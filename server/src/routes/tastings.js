import { Router } from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

router.get("/",
    async (req, res) => {
        const uid = req.user.uid;
        const tid = req.params.tid;
        try {

            const tastings = await prisma.tastings.findMany({
                where: { uid: uid }
            });

            if (!tastings) {
                res.status(404).json({ error: `Tasting ${tid} not found` });
                return;
            }

            if (tastings.length === 0) {
                res.status(404).json({ error: `No tastings found for user ${uid}` });
                return;
            }

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
        try {
            
            const tasting = await prisma.tastings.findUnique(
                { where : {
                    tid: tid,
                    uid: uid
                }}
            );

            if (!tasting) {
                res.status(404).json({ error: `Tasting ${tid} not found` });
                return;
            }

            res.json(tasting);

        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
);

export default router;

