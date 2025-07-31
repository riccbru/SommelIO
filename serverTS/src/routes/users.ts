import { Router, Request, Response } from "express";
import { PrismaClient, users as UserModel } from "../generated/prisma";
import { AuthenticatedRequest } from "../types";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/users/
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET /api/v1/users/me
router.get("/me", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.users.findUnique({ where: { uid: req.user.uid } });

    if (!user) {
      res.status(404).json({ error: `User ${req.user.uid} not found` });
      return;
    }

    const payload = {
      uid: user.uid,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
    };

    res.json(payload);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.meta?.message || "Internal server error" });
  }
});

// GET /api/v1/users/:uid
router.get("/:uid", async (req: AuthenticatedRequest, res: Response) => {
  const uid_req = req.user.uid;
  const uid_params = req.params.uid;

  try {
    if (uid_req !== uid_params) {
      res.status(403).json({ error: "You can only access your own user data" });
      return;
    }

    const user = await prisma.users.findUnique({ where: { uid: uid_params } });

    if (!user) {
      res.status(404).json({ error: `User ${uid_params} not found` });
      return;
    }

    const payload = {
      uid: user.uid,
      username: user.username,
      full_name: user.full_name,
    };

    res.json(payload);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error?.meta?.message || "Internal server error" });
  }
});

export default router;
