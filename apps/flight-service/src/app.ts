import express, { Express } from "express";
import "@package/shared-database";
import flightRouter from "./routes/flight-route";
import crewRouter from "./routes/crew-route";
import eventRouter from "./routes/event-route";
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

app.use("/api/flights", flightRouter);
app.use("/api/crews", crewRouter);
app.use("/api/events", eventRouter);
export default app;
