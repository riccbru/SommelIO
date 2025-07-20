import { Router } from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/users/
router.get("/",
  async (_req, res) => {
    try {
      const users = await prisma.users.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

// GET /api/v1/users/me
router.get("/me",
  async (req, res) => {
    const uid = req.user.uid;

    try {
      const user = await prisma.users.findUnique({ where: { uid } });

      if (!user) {
        res.status(404).json({ error: `User ${uid} not found` });
        return;
      }

      const payload = {
          uid: user?.uid,
          username: user?.username,
          fullName: user?.full_name,
      }

      res.json(payload);

    } catch (error) {
      res.status(500).json({ error: error?.meta?.message || "Internal server error" });
    }
  }
);

// GET /api/v1/users/:uid
router.get("/:uid",
  async (req, res) => {
    const uid_req = req.user.uid;
    const uid_params = req.params.uid;

    try {

      if (uid_req !== uid_params) {
        res.status(403).json({ error: "You can only access your own user data" });
        return;
      }

      const user = await prisma.users.findUnique({ where: { uid } });

      if (!user) {
        res.status(404).json({ error: `User ${uid} not found` });
        return;
      }

      const payload = {
          uid: user?.uid,
          username: user?.username,
          fullName: user?.full_name,
      }

      res.json(payload);

    } catch (error) {
      res.status(500).json({ error: error?.meta?.message || "Internal server error" });
    }
  }
);

export default router;