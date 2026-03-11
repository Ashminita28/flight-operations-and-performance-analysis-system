import { analyticsRepository } from "../repositories/analytics-repository";
import { AnalyticsFilters } from "../types/analytics-filters";

export const analyticsService = {
	async getDashboardCounterService(query: AnalyticsFilters) {
		const counters = await analyticsRepository.getDashboardCounter(query);

		return {
			success: true,
			data: counters,
		};
	},

	async getDelayAnalytics(query: AnalyticsFilters) {
		const result = await analyticsRepository.getDelayAnalytics(query);

		return {
			success: true,
			data: result.map((row: any) => ({
				category: row.delay_category,
				value: Number(row.total_delays),
			})),
		};
	},

	async getOnTimePerformance(query: AnalyticsFilters) {
		const performance = await analyticsRepository.getOnTimePerformance(query);

		return {
			success: true,
			data: performance,
		};
	},
};
