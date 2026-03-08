import express, { Express } from "express";
import performanceRouter from "./routes/performance-route";
import { errorHandler } from "@package/shared-middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use("/api", performanceRouter);
app.use(errorHandler);

export default app;
