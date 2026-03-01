import express, { Express } from "express";
import authRouter from "./routes/auth-routes";
import cookieParser from "cookie-parser";
import passwordRouter from "./routes/password-routes";
import adminRouter from "./routes/admin-routes";
import userRouter from "./routes/user-routes";
import morgan from "morgan";
import cors from "cors";

const app: Express = express();
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", authRouter);
app.use("/api", passwordRouter);
app.use("/api", adminRouter);
app.use("/api", userRouter);

export default app;
