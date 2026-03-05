import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { startConsumer } from "./rabbitmq/consumer";
import { initializeModels } from "@package/shared-database";

async function startWorker() {
	try {
		await initializeModels();
		await startConsumer();
		console.log("Worker consuming notifications...");

		app.listen(process.env.WORKER_PORT, () =>
			console.log("worker service running at port 3008"),
		);
	} catch (err) {
		console.error("worker service failed to start", err);
	}
}

startWorker();
