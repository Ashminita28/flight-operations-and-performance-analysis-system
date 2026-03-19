import { getChannel } from "@package/shared-config";
import { logger } from "@package/shared-config";

const REPORTING_QUEUE_NAME =
	process.env.REPORTING_QUEUE_NAME || "analytics_export_queue";

export async function publishReports(queue: string, message: any) {
	const channel = await getChannel();
	await channel.assertQueue(REPORTING_QUEUE_NAME, { durable: true });
	channel.sendToQueue(
		REPORTING_QUEUE_NAME,
		Buffer.from(JSON.stringify(message)),
		{
			persistent: true,
		},
	);
	logger.info("Published report message:", message);
}
