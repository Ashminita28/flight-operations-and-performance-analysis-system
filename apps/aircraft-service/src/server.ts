import dotenv from "dotenv";
dotenv.config();
import { validateEnv } from "@package/shared-config";
validateEnv();
import { initializeModels } from "@package/shared-database";
import app from "./app";
import { logger } from "@package/shared-config";

const PORT = Number(process.env.PORT) || 3002;
const start = async () => {
	await initializeModels();
	app.listen(PORT, "0.0.0.0", () => {
		logger.info("Aircraft service running on port 3002");
	});
};
start();
