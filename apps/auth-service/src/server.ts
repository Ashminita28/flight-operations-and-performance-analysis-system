import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { initializeModels } from "@package/shared-database";
import { logger } from "@package/shared-config";

const start = async () => {
	await initializeModels();
	app.listen(3000, () => {
		logger.info("auth service running on port 3000");
	});
};

start();
