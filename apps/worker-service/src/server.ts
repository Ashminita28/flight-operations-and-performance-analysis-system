import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { startConsumer } from "./rabbitmq/consumer";
import { startAnalyticsExportConsumer } from "./rabbitmq/analytics-export-consumer";
import { initializeModels } from "@package/shared-database";
import { startAnalyticsCron } from "./schedulers/analytics-cron";

async function startWorker() {
	try {
		await initializeModels();

		// Worker consuming notifications
		await startConsumer();

		// Worker consuming analytics exports
		await startAnalyticsExportConsumer();

		startAnalyticsCron();

		app.listen(process.env.PORT, () =>
			console.log(`Worker service running at port ${process.env.PORT || 3008}`),
		);
	} catch (err) {
		console.error("Worker service failed to start", err);
		process.exit(1);
	}
}

startWorker();
