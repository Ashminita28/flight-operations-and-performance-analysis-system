import express, { Express } from "express";
import path from "path";
import authRouter from "./routes/auth-routes";
import cookieParser from "cookie-parser";
import passwordRouter from "./routes/password-routes";
import adminRouter from "./routes/admin-routes";
import userRouter from "./routes/user-routes";
import { authHealth } from "./routes/auth-health-check";
import cors from "cors";
import { errorHandler, httpLogger, limiter } from "@package/shared-middleware";
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
app.use("/api/auth/health", authHealth);
app.use("/api/auth", limiter, authRouter);
app.use("/api/auth", passwordRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.use(
	"/swagger",
	express.static(path.resolve(__dirname, "../../../swagger")),
);

const swaggerFiles = [
	{ url: "/swagger/auth.yaml", name: "Auth Service" },
	{ url: "/swagger/aircraft.yaml", name: "Aircraft Service" },
	{ url: "/swagger/flight.yaml", name: "Flight Service" },
	{ url: "/swagger/operations.yaml", name: "Operations Service" },
	{ url: "/swagger/performance.yaml", name: "Performance Service" },
];

app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(null, {
		explorer: true,
		swaggerOptions: {
			urls: swaggerFiles,
		},
	}),
);
app.use(errorHandler);
export default app;
