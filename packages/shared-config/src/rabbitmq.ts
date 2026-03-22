import amqp from "amqplib";
import { logger } from "./logger";

type Connection = Awaited<ReturnType<typeof amqp.connect>>;
type Channel = Awaited<ReturnType<Connection["createChannel"]>>;

let connection: Connection | null = null;
let channel: Channel | null = null;
let connecting: Promise<void> | null = null;

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq:5672";

async function createConnection(): Promise<void> {
	const conn = await amqp.connect(RABBITMQ_URL);
	const ch = await conn.createChannel();

	connection = conn;
	channel = ch;

	logger.info("RabbitMQ connected");

	conn.on("close", () => {
		logger.warn("RabbitMQ connection closed. Reconnecting...");
		connection = null;
		channel = null;
		void reconnect(); // fire-and-forget
	});

	conn.on("error", (err: Error) => {
		logger.error("RabbitMQ error");
	});
}

async function reconnect(): Promise<void> {
	const RETRY_DELAY = 5000;

	while (!connection || !channel) {
		try {
			await createConnection();
			return;
		} catch (err) {
			logger.warn("RabbitMQ reconnect failed, retrying in 5s");
			await new Promise(res => setTimeout(res, RETRY_DELAY));
		}
	}
}

export async function connectRabbitMQ(): Promise<void> {
	if (connection && channel) return;

	if (!connecting) {
		connecting = (async () => {
			const MAX_RETRIES = 10;
			const RETRY_DELAY = 5000;

			for (let i = 0; i < MAX_RETRIES; i++) {
				try {
					await createConnection();
					connecting = null;
					return;
				} catch (err) {
					logger.warn(
						`RabbitMQ connect failed (${i + 1}/${MAX_RETRIES}), retrying...`,
					);
					await new Promise(res => setTimeout(res, RETRY_DELAY));
				}
			}

			connecting = null;
			throw new Error("Failed to connect to RabbitMQ after retries");
		})();
	}

	return connecting;
}

export function getChannel(): Channel {
	if (!channel) {
		throw new Error("RabbitMQ not initialized");
	}
	return channel;
}
