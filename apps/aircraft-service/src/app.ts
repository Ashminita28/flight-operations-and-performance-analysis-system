import express, { Express } from "express";
import aircraftRouter from "./routes/aircraft-route";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, httpLogger, limiter } from "@package/shared-middleware";
import { aircraftHealth } from "./routes/aircraft-health-check";
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
app.use("/api/aircraft/health", aircraftHealth);
app.use("/api", aircraftRouter);
app.use(
	"/api/aircraft/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(createSwaggerSpec("Aircraft Service", 3002)),
);
app.use(errorHandler);

export default app;
