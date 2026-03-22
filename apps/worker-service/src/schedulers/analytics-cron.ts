import cron from "node-cron";
import { analyticsRepository } from "../repositories/analytics-repository";
import { logger } from "@package/shared-config";

export const startAnalyticsCron = (): void => {
	cron.schedule("* * * * *", async () => {
		logger.info("Cron running.....");
		await analyticsRepository.getSummaryTable();
	});
};
