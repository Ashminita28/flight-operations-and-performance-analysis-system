import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { initializeModels } from "@package/shared-database";
import { logger } from "@package/shared-config";

const PORT = process.env.PORT;
const start = async () => {
	await initializeModels();
	app.listen(PORT, () => {
		logger.info("Operational event running at port 3004");
	});
};
start();
