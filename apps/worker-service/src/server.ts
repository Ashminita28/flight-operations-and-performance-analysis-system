import dotenv from "dotenv";
dotenv.config();
import { validateEnv } from "@package/shared-config";
validateEnv();
import app from "./app";
import { startConsumer } from "./rabbitmq/consumer";
import { startAnalyticsExportConsumer } from "./rabbitmq/analytics-export-consumer";
import { initializeModels } from "@package/shared-database";
import { startAnalyticsCron } from "./schedulers/analytics-cron";
import { logger } from "@package/shared-config";
import { connectRabbitMQ } from "@package/shared-config";
const PORT = Number(process.env.PORT) || 3008;
async function startWorker() {
	try {
		await initializeModels();
		await connectRabbitMQ();

		// Worker consuming notifications
		await startConsumer();

		// Worker consuming analytics exports
		await startAnalyticsExportConsumer();

		startAnalyticsCron();

		app.listen(PORT, "0.0.0.0", () =>
			logger.info(`Worker service running at port ${process.env.PORT || 3008}`),
		);
	} catch (err) {
		logger.error("Worker service failed to start");
		process.exit(1);
	}
}

startWorker();
