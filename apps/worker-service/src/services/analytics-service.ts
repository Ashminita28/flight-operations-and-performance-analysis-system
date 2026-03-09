import { analyticsRepository } from "../repositories/analytics-repository";

export const analyticsService = {
	async getDashboardCounterService() {
		const { totalFlights, delayFlights } =
			await analyticsRepository.getDashboardCounter();

		const onTimePerformance =
			totalFlights === 0
				? 0
				: ((totalFlights - delayFlights) / totalFlights) * 100;
		return {
			totalFlights,
			delayFlights,
			onTimePerformance: Number(onTimePerformance.toFixed(2)),
		};
	},
	async getOnTimePerformanceChart() {
		const data = await analyticsRepository.getOnTimePerformanceChart();

		return data.map(d => ({
			date: d.started_at,
			totalOntimeFlights: d.result_summary,
		}));
	},
};
