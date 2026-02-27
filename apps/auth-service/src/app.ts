import express, { Express } from "express";
import "@package/shared-database";
import authRouter from "./routes/auth-routes";
import cookieParser from "cookie-parser";
import passwordRouter from "./routes/password-routes";
import adminRouter from "./routes/admin-routes";
import userRouter from "./routes/user-routes";
import morgan from "morgan";
import cors from "cors";
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import path from "path";

// SWAGGER API
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "AVIATION AUTH-SERVICE API",
		version: "1.0.0",
		description: "AUTHENTICATION AND RBAC SERVICE DOCUMENTATION",
	},

	servers: [
		{
			url: "/api",
			description: "Development server",
		},
	],
};

const options = {
	swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	apis: [path.join(__dirname, "./routes/*.ts")],
};
const swaggerSpec = swaggerJSDoc(options);

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
app.use("/api/auth", authRouter);
app.use("/api/password", passwordRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
console.log(Object.keys(swaggerSpec.paths || {}));
// DISPLAY THE SWAGGER UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;
