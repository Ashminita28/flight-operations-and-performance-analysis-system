import dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
import { validateEnv } from "@package/shared-config";
validateEnv();
import app from "./app";
import { initializeModels } from "@package/shared-database";
import { logger } from "@package/shared-config";

const PORT = Number(process.env.PORT) || 3005;
const start = async () => {
	await initializeModels();
	app.listen(PORT, "0.0.0.0", () => {
		logger.info("performance service  running at port 3005");
	});
};
start();
