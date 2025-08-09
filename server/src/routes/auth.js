import argon2 from "argon2";
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import { LoginSchema } from "../validators/loginSchema.js";
import { SignupSchema } from "../validators/signupSchema.js";
import { PrismaClient } from "../generated/prisma/index.js";
import { formatUser, generateAccessToken, generateRefreshToken } from "../utils/auth.js";

const router = Router();
const prisma = new PrismaClient();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "JWT_refreshToken_secret";

// POST /api/v1/auth/login
router.post("/login",
    async (req, res) => {

        const parsed = LoginSchema.safeParse(req.body);
        if (!parsed.success) {
            const errMex = parsed.error._zod.def[0].message;
            return res.status(400).json({ error: errMex });
        }
        const { username, password } = parsed.data;

        try {
            const user = await prisma.users.findUnique({ where: { username } });
            if (!user || !user.password_hash) {
                return res.status(401).json({ error: "Invalid username and/or password" });
            }
            const valid = await argon2.verify(user.password_hash, password);
            if (!valid) {
                return res.status(401).json({ error: "Invalid username and/or password" });
            }

            const payload = {
                uid: user?.uid,
                admin: user?.admin,
                username: user?.username,
                full_name: user?.full_name,
                email: user?.email,
            }
            const accessToken = generateAccessToken(payload);
            const refreshToken = generateRefreshToken(payload);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, // true in HTTPS
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

// POST /api/v1/auth/signup
router.post("/signup",
    async (req, res) => {

        const parsed = SignupSchema.safeParse(req.body);
        if (!parsed.success) {
            const errMex = parsed.error._zod.def[0].message;
            return res.status(400).json({ error: errMex });
        }
        const { full_name, username, email, birthdate, password } = parsed.data;

        try {
            const existingUser = await prisma.users.findFirst({
                where: {
                    OR: [
                        { username },
                        { email }
                    ]
                }
            });
            if (existingUser) {
                return res.status(409).json({ error: "Username or email already taken" });
            }
            const password_hash = await argon2.hash(password);
            const user = await prisma.users.create({
                data: {
                    full_name: full_name,
                    username: username,
                    email: email,
                    birthdate: birthdate ? new Date(birthdate) : undefined,
                    password_hash
                }
            });

            return res.status(201).json(formatUser(user));
            
        } catch (err) {
            console.error("Signup ERROR:", err);
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

            const jwtPayload = {
                uid: user?.uid,
                admin: user?.admin,
                username: user?.username,
                full_name: user?.full_name,
                email: user?.email,
            }
            const newAccessToken = generateAccessToken(jwtPayload);

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