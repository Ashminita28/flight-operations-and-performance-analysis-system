import amqp from "amqplib";

const REPORTING_QUEUE_NAME =
	process.env.REPORTING_QUEUE_NAME || "analytics_export_queue";

export async function publishReports(queue: string, message: any) {
	const connection = await amqp.connect(
		process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
	);
	const channel = await connection.createChannel();
	await channel.assertQueue(REPORTING_QUEUE_NAME, { durable: true });
	channel.sendToQueue(
		REPORTING_QUEUE_NAME,
		Buffer.from(JSON.stringify(message)),
		{
			persistent: true,
		},
	);
	console.log("Published report message:", message);
	await channel.close();
	await connection.close();
}
