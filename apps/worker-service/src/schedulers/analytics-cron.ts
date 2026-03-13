import cron from "node-cron";
import { analyticsRepository } from "../repositories/analytics-repository";

export const startAnalyticsCron = (): void => {
	cron.schedule("* * * * *", async () => {
		console.log("Cron running.....");
		await analyticsRepository.getSummaryTable();
	});
};
