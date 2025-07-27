import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import loginRoutes from "./src/routes/auth.js";
import examsRoutes from "./src/routes/exams.js";
import usersRoutes from "./src/routes/users.js";
import welcomeRoute from "./src/routes/welcome.js";
import { isAuthZ } from "./src/middlewares/auth.js";
import tastingsRoutes from "./src/routes/tastings.js";

const app = express();

dotenv.config(
    {
        debug: true,
        override: true
    }
);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173' }));

const SERVER_PORT = parseInt(process.env.SERVER_PORT || "3001", 10);
app.listen(SERVER_PORT, () => {
    console.log(`\x1b[42m[*]\x1b[0m \x1b[92mBackend listening on \x1b[1m${SERVER_PORT}...\x1b[0m`);
});

app.use("/api/v1/auth", loginRoutes);
app.use("/api/v1/users", isAuthZ, usersRoutes);
app.use("/api/v1/welcome", isAuthZ, welcomeRoute);
app.use("/api/v1/tastings", isAuthZ, tastingsRoutes);
app.use("/api/v1/exams", isAuthZ, examsRoutes);