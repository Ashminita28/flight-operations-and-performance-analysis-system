import express, { Express } from "express";
import flightRouter from "./routes/flight-route";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.use("/api", flightRouter);
export default app;
