import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import loginRoutes from "./src/routes/auth.js";
import winesRoutes from "./src/routes/wines.js";
import usersRoutes from "./src/routes/users.js";
import welcomeRoute from "./src/routes/welcome.js";
import { isAuthZ } from "./src/middlewares/auth.js";
import scoringRoutes from "./src/routes/scorings.js";
import oldExamsRoutes from "./src/routes/oldExams.js";
import newExamsRoutes from "./src/routes/newExams.js";
import tastingsRoutes from "./src/routes/tastings.js";
import colleaguesRoutes from "./src/routes/colleagues.js";

const app = express();

dotenv.config({
	debug: true,
	override: true,
});
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173" }));

const SERVER_PORT = parseInt(process.env.SERVER_PORT || "3001", 10);
app.listen(SERVER_PORT, () => {
	console.log(`\x1b[42m[*]\x1b[0m \x1b[92mBackend listening on \x1b[1m${SERVER_PORT}...\x1b[0m`);
});

app.use("/api/v1/auth", loginRoutes);
app.use("/api/v1/users", isAuthZ, usersRoutes);
app.use("/api/v1/welcome", isAuthZ, welcomeRoute);
app.use("/api/v1/tastings", isAuthZ, tastingsRoutes);
app.use("/api/v1/exams", isAuthZ, oldExamsRoutes);
app.use("/api/v2/exams", isAuthZ, newExamsRoutes);
app.use("/api/v1/scoring", isAuthZ, scoringRoutes);
app.use("/api/v1/colleagues", isAuthZ, colleaguesRoutes);
app.use("/api/v1/wines", isAuthZ, winesRoutes);
