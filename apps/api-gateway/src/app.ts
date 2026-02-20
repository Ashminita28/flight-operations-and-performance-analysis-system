import express from "express";
import cors from "cors";
import router from "./routes";
import { swaggerUi, swaggerSpec } from "./config/swagger";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
