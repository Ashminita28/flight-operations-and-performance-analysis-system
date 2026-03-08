import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import operationRouter from "./routes/operation-route";
import delayRouter from "./routes/delay-routes";

const app: Express = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);
app.use("/api/operations", operationRouter);
app.use("/api", delayRouter);

export default app;
