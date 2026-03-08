import amqp from "amqplib";

const QUEUE_NAME = "flight_status_notifications";

export async function publishNotification(message: any) {
	const connection = await amqp.connect(
		process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
	);
	const channel = await connection.createChannel();
	await channel.assertQueue(QUEUE_NAME, { durable: true });
	channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
		persistent: true,
	});
	console.log("Published message:", message);
	await channel.close();
	await connection.close();
}
