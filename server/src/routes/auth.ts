import argon2 from "argon2";
import { Router } from "express";
import { PrismaClient } from "../generated/prisma";

const router = Router();
const prisma = new PrismaClient();


router.post("/", async (req, res) => {
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

    res.json(user);

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;