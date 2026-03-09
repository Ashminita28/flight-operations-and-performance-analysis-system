import { Analytics, Flight } from "@package/shared-database";
import { AnalyticsSummary } from "@package/shared-database";
import { Op } from "sequelize";

export const analyticsRepository = {
	// COUNTERS
	async getDashboardCounter() {
		const totalFlights = await Flight.count({
			where: {
				flight_date: new Date(),
			},
		});
		const delayFlights = await Flight.count({
			where: {
				flight_date: new Date(),
				status: "delayed",
			},
		});
		return { totalFlights, delayFlights };
	},
	async getOnTimePerformanceChart() {
		const setMonthAgo = new Date();
		setMonthAgo.setDate(setMonthAgo.getDate() - 30);
		return Analytics.findAll({
			where: {
				started_at: {
					[Op.gte]: setMonthAgo,
				},
			},
			order: [["date", "ASC"]],
		});
	},
};
