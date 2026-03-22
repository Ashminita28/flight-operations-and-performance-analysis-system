import express, { Express } from "express";
import performanceRouter from "./routes/performance-route";
import { errorHandler, httpLogger, limiter } from "@package/shared-middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import { performanceHealth } from "./routes/performance-health-check";
import helmet from "helmet";

const app: Express = express();
app.use(helmet());
app.use(limiter);
app.use(
	cors({
		origin: process.env.ORIGIN,
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

app.use(httpLogger);
app.use("/api/performance/health", performanceHealth);
app.use("/api", performanceRouter);

app.use(errorHandler);

export default app;
