import express, { Express } from "express";
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
		title: "LMS API",
		version: "1.0.0",
		description: "This is a REST API application made with Express.",
		license: {
			name: "Licensed Under MIT",
			url: "https://spdx.org/licenses/MIT.html",
		},
		contact: {
			name: "JSONPlaceholder",
			url: "https://jsonplaceholder.typicode.com",
		},
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT",
			},
		},
	},
	security: [
		{
			beareAuth: [],
		},
	],
	servers: [
		{
			url: "http://localhost:3000",
			description: "Development server",
		},
	],
};

const options = {
	swaggerDefinition,
	// Paths to files containing OpenAPI definitions
	apis: [path.join(__dirname, "routes", "*.ts")],
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

app.use("/api", authRouter);
app.use("/api", passwordRouter);
app.use("/api", adminRouter);
app.use("/api", userRouter);

// DISPLAY THE SWAGGER UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export default app;
