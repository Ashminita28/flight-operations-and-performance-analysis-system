import express, { Express } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import operationRouter from "./routes/operation-route";
import delayRouter from "./routes/delay-routes";
import { errorHandler, httpLogger, limiter } from "@package/shared-middleware";
import { operationHealth } from "./routes/operation-health-check";
import swaggerUi from "swagger-ui-express";
import { createSwaggerSpec } from "@package/shared-config";

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

app.use("/api/operations/health", operationHealth);
app.use("/api/operations", operationRouter);
app.use("/api", delayRouter);
app.use(
	"/api/operations/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(createSwaggerSpec("Operational service", 3004)),
);
app.use(errorHandler);
export default app;
