import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import { analyticsRepository } from "../repositories/analytics-repository";
import {
	CSV_EXPORT_CONFIG,
	RABBITMQ_CONFIG,
} from "../constants/analytics-constants";
import { Parser } from "json2csv";
import { ExportMessage } from "../types/export-message";
import { getDateRangeByFilter } from "../utils/date-range-filter";
import { logger } from "@package/shared-config";
import { getChannel } from "@package/shared-config";

export async function startAnalyticsExportConsumer() {
	try {
		const channel = getChannel();

		await channel.assertQueue(RABBITMQ_CONFIG.reporting_queue, {
			durable: RABBITMQ_CONFIG.durable,
		});

		await channel.prefetch(RABBITMQ_CONFIG.prefetch_count);

		channel.consume(
			RABBITMQ_CONFIG.reporting_queue,
			async msg => {
				if (!msg) return;

				try {
					const messageContent: ExportMessage = JSON.parse(
						msg.content.toString(),
					);

					await processAnalyticsExport(messageContent);

					channel.ack(msg);
				} catch (error) {
					channel.nack(msg, false, true);
				}
			},
			{ noAck: false },
		);

		logger.info("Analytics Export Consumer started");
	} catch (error: any) {
		logger.error("Consumer failed:", error);

		setTimeout(startAnalyticsExportConsumer, 5000);
	}
}

// Process analytics export job- Generates CSV file and sends email
async function processAnalyticsExport(message: ExportMessage): Promise<void> {
	try {
		const { job_id, filters } = message;

		// Get date range based on time filter
		const dateRange = getDateRangeByFilter(filters.time_filter);

		// Fetch export data from repository
		const exportData = await analyticsRepository.getExportData({
			startDate: dateRange.startDate ?? " ",
			endDate: dateRange.endDate ?? " ",
			origin_airport: filters.origin_airport,
			destination_airport: filters.destination_airport,
			aircraft_id: filters.aircraft_id,
		});

		if (!exportData || exportData.length === 0) {
			await sendErrorEmail(
				filters.email,
				job_id,
				"No data available for the specified filters",
			);
			return;
		}

		// Generate CSV content
		const csvContent = generateCSVContent(exportData);

		// Save CSV file
		const exportDir = path.join(__dirname, `..${"/.."}/exports`);
		if (!fs.existsSync(exportDir)) {
			fs.mkdirSync(exportDir, { recursive: true });
		}

		const fileName = `${CSV_EXPORT_CONFIG.file_prefix}_${job_id}.csv`;
		const filePath = path.join(exportDir, fileName);

		fs.writeFileSync(filePath, csvContent);

		// Send email with attachment
		await sendEmailWithAttachment(filters.email, job_id, filePath, fileName);

		// Delete file after sending
		setTimeout(() => {
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
		}, 3600000);
	} catch (error) {
		console.error("Analytics Export Error processing export:", error);
		throw error;
	}
}

//  Generate CSV content from analytics data
function generateCSVContent(data: any[]): string {
	try {
		const fields = CSV_EXPORT_CONFIG.fields;
		const parser = new Parser({ fields });
		return parser.parse(data);
	} catch (error) {
		console.error("[Analytics Export] Error generating CSV:", error);
		throw new Error("Failed to generate CSV content");
	}
}

// Send email with CSV attachment
async function sendEmailWithAttachment(
	to: string,
	jobId: string,
	filePath: string,
	fileName: string,
): Promise<void> {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth:
				process.env.EMAIL_USER && process.env.EMAIL_PASS
					? {
							user: process.env.EMAIL_USER,
							pass: process.env.EMAIL_PASS,
						}
					: undefined,
		});

		const mailOptions = {
			from: process.env.EMAIL_USER || "ashminita12@gmail.com",
			to,
			subject: `Analytics Report Export - Job ${jobId}`,
			html: `
        <h2>Analytics Report Export</h2>
        <p>Your requested analytics report has been generated and is attached.</p>
        <p><strong>Job ID:</strong> ${jobId}</p>
        <p><strong>Generated at:</strong> ${new Date().toISOString()}</p>
        <p>Thank you for using the Aviation Flight Operations & Performance Analytics System.</p>
      `,
			attachments: [
				{
					filename: fileName,
					path: filePath,
				},
			],
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(`Analytics Export Failed to send email:`, error);
		throw new Error("Failed to send email with attachment");
	}
}

// Send error notification email
async function sendErrorEmail(
	to: string,
	jobId: string,
	errorMessage: string,
): Promise<void> {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || "localhost",
			port: parseInt(process.env.SMTP_PORT || "587"),
			secure: process.env.SMTP_SECURE === "true",
			auth:
				process.env.EMAIL_USER && process.env.EMAIL_PASS
					? {
							user: process.env.EMAIL_USER,
							pass: process.env.EMAIL_PASS,
						}
					: undefined,
		});

		const mailOptions = {
			from: process.env.EMAIL_USER || "noreply@aviation-system.com",
			to,
			subject: `Analytics Report Export Failed - Job ${jobId}`,
			html: `
        <h2>Analytics Report Export Failed</h2>
        <p>Your analytics report export could not be completed.</p>
        <p><strong>Job ID:</strong> ${jobId}</p>
        <p><strong>Error:</strong> ${errorMessage}</p>
        <p>Please try again with different filters.</p>
      `,
		};

		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.error(`Analytics Export Failed to send error email:`, error);
	}
}
