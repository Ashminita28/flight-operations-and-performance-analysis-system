import express, { Express } from "express";
import authRouter from "./routes/auth-routes";
import cookieParser from "cookie-parser";
import passwordRouter from "./routes/password-routes";
import adminRouter from "./routes/admin-routes";
import userRouter from "./routes/user-routes";

const app: Express = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api", passwordRouter);
app.use("/api/admin", adminRouter);
app.use("/api", userRouter);

export default app;
