import express, { Express } from "express";
import performanceRouter from "./routes/performance-route";
import { errorHandler } from "@package/shared-middleware";

const app: Express = express();

app.use(express.json());
app.use("/api", performanceRouter);
app.use(errorHandler);

export default app;
