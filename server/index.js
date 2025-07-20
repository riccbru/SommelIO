import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";

import usersRoute from "./src/routes/users.js";
import loginRoute from "./src/routes/auth.js";
import welcomeRoute from "./src/routes/welcome.js";
import { isAuthZ } from "./src/middlewares/auth.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173' }));

const SERVER_PORT = parseInt(process.env.SERVER_PORT || "3001", 10);
app.listen(SERVER_PORT, () => {
    console.log(`\x1b[42m[*]\x1b[0m \x1b[92mBackend listening on \x1b[1m${SERVER_PORT}...\x1b[0m`);
});

app.use("/api/v1/welcome", isAuthZ, welcomeRoute);
app.use("/api/v1/users", isAuthZ, usersRoute);
app.use("/api/v1/auth", loginRoute);