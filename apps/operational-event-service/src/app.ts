import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import operationRouter from "./routes/operation-route";

const app: Express = express();

app.use(helmet);
app.use(morgan("dev"));
app.use("/api", operationRouter);

export default app;
