import dotenv from "dotenv";
dotenv.config();
import { connectRabbitMQ, validateEnv } from "@package/shared-config";
validateEnv();
import app from "./app";
import { initializeModels } from "@package/shared-database";
import { logger } from "@package/shared-config";

const PORT = Number(process.env.PORT) || 3004;
const start = async () => {
	await initializeModels();
	await connectRabbitMQ();
	app.listen(PORT, "0.0.0.0", () => {
		logger.info("Operational event running at port 3004");
	});
};
start();
