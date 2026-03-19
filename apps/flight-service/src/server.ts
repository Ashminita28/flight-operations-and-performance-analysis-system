import dotenv from "dotenv";
dotenv.config;
import { logger, validateEnv } from "@package/shared-config";
validateEnv();
import app from "./app";
import { initializeModels } from "@package/shared-database";
const PORT = Number(process.env.PORT) || 3001;
const start = async () => {
	await initializeModels();
	app.listen(PORT, "0.0.0.0", () => {
		logger.info("flight service unning on port 3001");
	});
};

start();
