import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma";
import { Router, Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

const JWT_ACCESS_EXPTIME = process.env.JWT_ACCESS_EXPTIME || "15m";
const JWT_REFRESH_EXPTIME = process.env.JWT_REFRESH_EXPTIME || "7d";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JWT_accessToken_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "JWT_refreshToken_secret";

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password required" });
  }

  try {
    const user = await prisma.users.findUnique({ where: { username } });
    if (!user) {
      res.status(401).json({ error: `User ${username} does not exist` });
    }

    const hash = user?.password_hash;
    if (!hash) res.status(404).json({ error: "No stored hash" });

    const valid = await argon2.verify(hash as string, password);

    if (!valid) {
      res.status(401).json({ error: "Invalid username and/or password" });
    }

    const payload = {
      uid: user?.uid,
      username: user?.username,
      fullName: user?.full_name,
    }

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;