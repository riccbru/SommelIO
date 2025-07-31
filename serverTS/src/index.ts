import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import express, { Application } from "express";

import authRoute from "./routes/auth";
import loginRoute from "./routes/users";
import welcomeRoute from "./routes/hello";


const app: Application = express();

dotenv.config({
    debug: true,
    override: true
});
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/welcome", welcomeRoute);
app.use("/api/v1/users", loginRoute);
app.use("/api/v1/login", authRoute);

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT || "3000", 10);
app.listen(SERVER_PORT, () => {
    console.log(`\x1b[42m[*]\x1b[0m \x1b[92mBackend listening on \x1b[1m${SERVER_PORT}...\x1b[0m`);
});