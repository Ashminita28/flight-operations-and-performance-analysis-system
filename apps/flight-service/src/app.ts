import express, { Express } from "express";
import flightRouter from "./routes/flight-route";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, httpLogger, limiter } from "@package/shared-middleware";
import { flightHealth } from "./routes/flight-health-check";

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

app.use("/api/flights/health", flightHealth);
app.use("/api", flightRouter);

app.use(errorHandler);
export default app;
