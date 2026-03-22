import { getChannel, logger } from "@package/shared-config";

const QUEUE_NAME = "flight_status_notifications";

export async function publishNotification(message: any) {
	const channel = getChannel();
	await channel.assertQueue(QUEUE_NAME, { durable: true });
	channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
		persistent: true,
	});
	logger.info("Published message:", message);
}
