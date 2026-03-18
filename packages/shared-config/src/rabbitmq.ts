import amqp from "amqplib";
import { logger } from "./logger";

type Connection = Awaited<ReturnType<typeof amqp.connect>>;
type Channel = Awaited<ReturnType<Connection["createChannel"]>>;

let connection: Connection | null = null;
let channel: Channel | null = null;

export async function connectRabbitMQ() {
	if (connection && channel) return { connection, channel };

	connection = await amqp.connect(
		process.env.RABBITMQ_URL || "amqp://rabbitmq:5672",
	);

	channel = await connection.createChannel();

	logger.info("RabbitMQ connected");

	connection.on("close", () => {
		connection = null;
		channel = null;
	});

	connection.on("error", err => {
		logger.error(err);
	});

	return { connection, channel };
}

export function getChannel(): Channel {
	if (!channel) {
		throw new Error("RabbitMQ not initialized");
	}
	return channel;
}
