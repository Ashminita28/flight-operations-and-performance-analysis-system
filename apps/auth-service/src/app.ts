import express, { Express } from "express";
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
		origin: process.env.ORIGIN?.split(","),
		credentials: true,
	}),
);
app.use(express.json());
app.use(cookieParser());

app.use(httpLogger);
app.use("/api/auth/health", authHealth);
app.use("/api/auth", authRouter);
app.use("/api/auth", passwordRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use(
	"/api/auth/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(createSwaggerSpec("Auth Service", 3000)),
);
app.use(errorHandler);
export default app;
