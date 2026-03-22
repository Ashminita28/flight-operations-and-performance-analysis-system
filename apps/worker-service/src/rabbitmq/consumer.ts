import { Notification } from "@package/shared-database";
import { getChannel } from "@package/shared-config";
import { logger } from "@package/shared-config";

const QUEUE_NAME = "flight_status_notifications";

export async function startConsumer() {
	const channel = getChannel();
	await channel.assertQueue(QUEUE_NAME, { durable: true });

	channel.consume(
		QUEUE_NAME,
		async msg => {
			if (msg) {
				const data = JSON.parse(msg.content.toString());

				await Notification.create({
					flight_id: data.flight_id,
					title: data.title,
					message: data.message,
					type: data.type,
					is_read: false,
				});

				channel.ack(msg);
			}
		},
		{ noAck: false },
	);
	logger.info("Notification consumer started");
}
