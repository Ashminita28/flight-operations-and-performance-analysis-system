import express, { Express } from "express";

import notificationRouter from "./routes/notification-route";
import cookieParser from "cookie-parser";
import cors from "cors";
import analyticsRouter from "./routes/analytics-route";
import { errorHandler, httpLogger, limiter } from "@package/shared-middleware";
import { workerHealth } from "./routes/worker-health-check";
import swaggerUi from "swagger-ui-express";
import { createSwaggerSpec } from "@package/shared-config";
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
app.use("/api/analytics/health", workerHealth);
app.use("/api", notificationRouter);
app.use("/api/analytics", analyticsRouter);
app.use(
	"/api/analytics/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(createSwaggerSpec("Analytics Service", "/api/analytics")),
);
app.use(errorHandler);

export default app;
