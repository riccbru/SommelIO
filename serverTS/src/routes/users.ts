import { PrismaClient } from "../generated/prisma";
import { Router, Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/users/
router.get("/", async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET /api/v1/users/:uid
router.get("/:uid", async (req: Request, res: Response): Promise<void> => {
  const uid: string = req.params.uid;

  try {
    const user = await prisma.users.findUnique({ where: { uid } });

    if (!user) {
      res.status(404).json({ error: `User ${uid} not found` });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error?.meta?.message || "Internal server error" });
  }
});

export default router;