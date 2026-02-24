import express, { Express } from "express";
import aircraftRouter from "./routes/aircraft-route";
import "../src/models/index";

const app: Express = express();

app.use(express.json());
app.use(aircraftRouter);

export default app;
