import express, { Express } from "express";
import authRouter from "./routes/auth-routes";

const app: Express = express();
app.use(express.json());

app.use("/api/auth", authRouter);

export default app;
