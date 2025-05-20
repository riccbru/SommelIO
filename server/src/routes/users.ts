import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// GET /api/v1/users/:uid
router.get("/:uid", async (req, res) => {
    const uid = req.params.uid;
    try {
        const user = await prisma.users.findUnique({ where: { uid } });
        if (!user)
            res.status(404).json({ error: `User ${uid} not found` });
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.meta.message });
    }
});

export default router;