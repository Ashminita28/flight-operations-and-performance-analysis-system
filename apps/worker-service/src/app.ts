import express, { Express } from "express";

import router from "./routes/notification-route";

const app: Express = express();

app.use("/notifications", router);

export default app;
