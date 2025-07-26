import argon2 from "argon2";
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/index.js";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";

const router = Router();
const prisma = new PrismaClient();

const JWT_ACCESS_EXPTIME = process.env.JWT_ACCESS_EXPTIME || "15m";
const JWT_REFRESH_EXPTIME = process.env.JWT_REFRESH_EXPTIME || "7d";
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JWT_accessToken_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "JWT_refreshToken_secret";

// POST /api/v1/auth/login
router.post("/login",
    async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ error: "Username and password required" });
        }
        try {
            const user = await prisma.users.findUnique({ where: { username } });
            const valid = await argon2.verify(user.password_hash, password);
            if (!user || !user.password_hash) {
                res.status(401).json({ error: "Invalid username and/or password" });
            }

            const payload = {
                uid: user?.uid,
                admin: user?.admin,
                username: user?.username,
                fullName: user?.full_name,
                email: user?.email,
            }
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // true quando si è in HTTPS
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ token: accessToken });

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

// POST /api/v1/auth/refresh
router.post("/refresh",
    async (req, res) => {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken || typeof refreshToken !== "string" || refreshToken.trim().length === 0) {
            return res.status(401).json({ error: "Refresh token required" });
        }

        try {
            const payload = jsonwebtoken.verify(refreshToken, JWT_REFRESH_SECRET);
            const user = await prisma.users.findUnique({ where: { uid: payload.uid } });

            if (!user) {
                return res.status(401).json({ error: "User not found" });
            }

            const newAccessToken = generateAccessToken({
                uid: user.uid,
                username: user.username,
                fullName: user.full_name,
            });

            res.json({ token: newAccessToken });
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Refresh token expired" });
            }
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ error: "Invalid refresh token" });
            }
            console.error("Refresh token ERROR:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

// POST /api/v1/auth/logout
router.post("/logout",
    (_req, res) => {
        res.clearCookie('refreshToken');
        return res.sendStatus(204);
    }
);

export default router;