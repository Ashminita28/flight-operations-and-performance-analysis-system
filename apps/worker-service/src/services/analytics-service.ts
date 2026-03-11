import { analyticsRepository } from "../repositories/analytics-repository";
import { AnalyticsFilters } from "../types/analytics-filters";
import path from "path";
import fs from "fs";
import { Parser } from "json2csv";
import { AnalyticsSummary } from "@package/shared-database";
import { ApiError, HTTP_STATUS, MESSAGES } from "@package/shared-utils";

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

	async getSummaryTableService(query: AnalyticsFilters) {
		const table = await analyticsRepository.getActiveFlightsInformation(query);
		if (!table) {
			throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.FLIGHT_NOT_FOUND);
		}
		return table;
	},

	async getAnalyticsReportService(filters: any) {
		const data = await AnalyticsSummary.findAll({
			where: filters,
			raw: true,
			order: [["date", "DESC"]],
		});
		if (!data.length) throw new Error("No data to export");
		const fields = [
			"date",
			"origin_airport",
			"destination_airport",
			"aircraft_id",
			"total_flights",
			"delayed_flights",
			"avg_delay_minutes",
			"avg_flight_time_minutes",
			"avg_load_factor_pct",
			"avg_fuel_efficiency",
		];
		const parser = new Parser({ fields });
		const csv = parser.parse(data);
		const fileName = `analytics_export_${Date.now()}.csv`;
		const filePath = path.join(__dirname, "../../exports", fileName);
		fs.writeFileSync(filePath, csv);
		return filePath;
	},
};
