import {
	Flight,
	FlightPerformance,
	OperationalEvent,
	AnalyticsSummary,
} from "@package/shared-database";
import { Op, fn, col, WhereOptions } from "sequelize";
import { AnalyticsFilters } from "../types/analytics-filters";

export const analyticsRepository = {
	// COUNTERS
	async getDashboardCounter(filters: {
		startDate?: string;
		endDate?: string;
		origin_airport?: string;
		destination_airport?: string;
	}) {
		const where: Record<string, unknown> = {};

		if (filters.startDate && filters.endDate) {
			where.departure_time = {
				[Op.between]: [filters.startDate, filters.endDate],
			};
		}

		if (filters.origin_airport) {
			where.origin_airport = filters.origin_airport;
		}

		if (filters.destination_airport) {
			where.destination_airport = filters.destination_airport;
		}

		const totalFlights = await Flight.count({ where });

		const delayedFlights = await Flight.count({
			where: {
				status: "delayed",
			},
		});

		const activeFlights = await Flight.count({
			where: {
				...where,
				status: ["scheduled", "boarding", "departed"],
			},
		});

		const onTimePerformance =
			totalFlights === 0
				? 0
				: ((totalFlights - delayedFlights) / totalFlights) * 100;

		return {
			totalFlights,
			delayedFlights,
			activeFlights,
			onTimePerformance: Number(onTimePerformance.toFixed(2)),
		};
	},

	// DELAY ANALYTICS CHART
	async getDelayAnalytics(filters: {
		startDate?: string;
		endDate?: string;
		origin_airport?: string;
		destination_airport?: string;
	}) {
		const where: Record<string, unknown> = {};

		if (filters.startDate && filters.endDate) {
			where.date = {
				[Op.between]: [filters.startDate, filters.endDate],
			};
		}

		if (filters.origin_airport) {
			where.origin_airport = filters.origin_airport;
		}

		if (filters.destination_airport) {
			where.destination_airport = filters.destination_airport;
		}

		return AnalyticsSummary.findAll({
			attributes: [
				"delay_category",
				[fn("SUM", col("delayed_flights")), "total_delays"],
			],
			where,
			group: ["delay_category"],
			raw: true,
		});
	},

	// ON TIME PERFORMANCE
	async getOnTimePerformance(filters: {
		startDate?: string;
		endDate?: string;
		origin_airport?: string;
		destination_airport?: string;
	}) {
		const where: Record<string, unknown> = {};

		if (filters.startDate && filters.endDate) {
			where.date = {
				[Op.between]: [filters.startDate, filters.endDate],
			};
		}

		if (filters.origin_airport) {
			where.origin_airport = filters.origin_airport;
		}

		if (filters.destination_airport) {
			where.destination_airport = filters.destination_airport;
		}

		const rows = await AnalyticsSummary.findAll({
			attributes: [
				"date",
				[fn("SUM", col("total_flights")), "totalFlights"],
				[fn("SUM", col("delayed_flights")), "delayedFlights"],
			],
			where,
			group: ["date"],
			order: [["date", "ASC"]],
			raw: true,
		});

		return rows.map((row: any) => {
			const total = Number(row.totalFlights);
			const delayed = Number(row.delayedFlights);

			const performance = total === 0 ? 0 : ((total - delayed) / total) * 100;

			return {
				date: row.date,
				onTimePerformance: Number(performance.toFixed(2)),
			};
		});
	},

	async getActiveFlightsInformation(filters: AnalyticsFilters) {
		const page = filters.page ?? 1;
		const limit = filters.limit ?? 10;
		const offset = (page - 1) * limit;
		const sortOrder =
			(filters.sort_order || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC";
		let order: [string, string][];
		if (filters.sort_by === "route") {
			order = [
				["origin_airport", sortOrder],
				["destination_airport", sortOrder],
			];
		} else if (filters.sort_by === "status") {
			order = [
				["scheduled", sortOrder],
				["departed", sortOrder],
				["boarding", sortOrder],
			];
		}
		const today = new Date().toISOString().split("T")[0];
		const { rows, count } = await Flight.findAndCountAll({
			where: {
				flight_date: today,
				status: ["scheduled", "boarding", "departed"],
			},
			limit,
			offset,
		});
		return {
			flights: rows,
			pagination: {
				total: count,
				page,
				limit,
				total_pages: Math.ceil(count / limit),
			},
		};
	},
};
