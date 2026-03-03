import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import operationRouter from "./routes/operation-route";
import delayRouter from "./routes/delay-routes";

const app: Express = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", operationRouter);
app.use("/api", delayRouter);

export default app;
