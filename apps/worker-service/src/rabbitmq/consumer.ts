import amqp from "amqplib";
import { Notification } from "@package/shared-database";

const QUEUE_NAME = "flight_status_notifications";

export async function startConsumer() {
	const connection = await amqp.connect(
		process.env.RABBITMQ_URL || "amqp://localhost",
	);
	const channel = await connection.createChannel();
	await channel.assertQueue(QUEUE_NAME, { durable: true });

	channel.consume(
		QUEUE_NAME,
		async msg => {
			if (msg) {
				const data = JSON.parse(msg.content.toString());
				console.log("Received message:", data);

				await Notification.create({
					flight_id: data.flight_id,
					title: data.title,
					message: data.message,
					type: data.type,
					is_read: data.is_read,
				});

				channel.ack(msg);
			}
		},
		{ noAck: false },
	);
}
