import express, { Express } from "express";

import router from "./routes/notification-route";
import cookieParser from "cookie-parser";
import cors from "cors";
import analyticsRouter from "./routes/analytics-route";
import { errorHandler } from "@package/shared-middleware";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use("/api", router);
app.use("/api", analyticsRouter);
app.use(errorHandler);

export default app;
