import express, { Express } from "express";
import aircraftRouter from "./routes/aircraft-route";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "@package/shared-middleware";

const app: Express = express();
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", aircraftRouter);
app.use(errorHandler);

export default app;
