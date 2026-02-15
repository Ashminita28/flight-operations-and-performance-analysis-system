import express, { Express } from "express";
import router from "./routes/auth-routes";

const app: Express = express();
app.use(express.json());

app.use("/api/auth", router);

export default app;
