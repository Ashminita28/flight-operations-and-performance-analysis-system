import express, { Express } from "express";
import "../src/models/index";

const app: Express = express();
app.use(express.json());

export default app;
