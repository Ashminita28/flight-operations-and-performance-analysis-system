import {
	Flight,
	FlightPerformance,
	OperationalEvent,
	AnalyticsSummary,
	DelayCategory,
} from "@package/shared-database";

import { Op, fn, col, where, literal } from "sequelize";

import {
	AnalyticsFilters,
	DashboardCounters,
	OnTimePerformanceDataPoint,
	DelayAnalysisDataPoint,
	ActiveFlight,
	PaginatedResponse,
} from "../types/analytics-filters";
import { FlightAnalyticsRow } from "../types/flight-analytics-type";
import {
	ACTIVE_FLIGHT_STATUSES,
	DEFAULT_PAGINATION,
} from "../constants/analytics-constants";
import { getDateRangeByFilter } from "../utils/date-range-filter";

export const analyticsRepository = {
	// Dashboard Counters
	async getDashboardCounter(
		filters: AnalyticsFilters,
	): Promise<DashboardCounters> {
		const today = new Date();

		const startOfDay = new Date(today);
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date(today);
		endOfDay.setHours(23, 59, 59, 999);

		const whereClause: Record<string, unknown> = {
			flight_date: {
				[Op.between]: [startOfDay, endOfDay],
			},
		};

		if (filters.origin_airport) {
			whereClause.origin_airport = filters.origin_airport.toUpperCase();
		}

		if (filters.destination_airport) {
			whereClause.destination_airport =
				filters.destination_airport.toUpperCase();
		}

		const totalFlights = await Flight.count({
			where: whereClause,
		});

		const activeFlights = await Flight.count({
			where: {
				...whereClause,
				status: {
					[Op.in]: ACTIVE_FLIGHT_STATUSES,
				},
			},
		});

		const delayedFlights = await Flight.count({
			where: {
				...whereClause,
				status: "delayed",
			},
		});

		// on-time condition
		const onTimeFlights = await Flight.count({
			where: {
				...whereClause,
				status: "landed",
				[Op.and]: where(
					col("actual_arrival"),
					Op.lte,
					col("scheduled_arrival"),
				),
			},
		});

		const onTimePerformancePct =
			totalFlights === 0
				? 0
				: Number(((onTimeFlights / totalFlights) * 100).toFixed(2));

		return {
			total_flights: totalFlights,
			active_flights: activeFlights,
			on_time_flights: onTimeFlights,
			delayed_flights: delayedFlights,
			on_time_performance_pct: onTimePerformancePct,
		};
	},

	// Delay Analytics
	async getDelayAnalytics(
		filters: AnalyticsFilters,
	): Promise<DelayAnalysisDataPoint[]> {
		const { startDate, endDate } = getDateRangeByFilter(
			filters.time_filter || "monthly",
		);

		const flightWhere: Record<string, unknown> = {
			flight_date: { [Op.between]: [startDate, endDate] },
		};

		if (filters.origin_airport) {
			flightWhere.origin_airport = filters.origin_airport.toUpperCase();
		}

		if (filters.destination_airport) {
			flightWhere.destination_airport =
				filters.destination_airport.toUpperCase();
		}

		const delayData = await OperationalEvent.findAll({
			attributes: [
				[
					fn("COALESCE", col("delayCategory.name"), literal("'Unknown'")),
					"category",
				],
				[fn("COUNT", col("OperationalEvent.id")), "incident_count"],
				[
					fn("SUM", col("OperationalEvent.delay_minutes")),
					"total_delay_minutes",
				],
			],
			include: [
				{
					model: Flight,
					as: "flight",
					attributes: [],
					where: flightWhere,
					required: true,
				},
				{
					model: DelayCategory,
					as: "delayCategory",
					attributes: [],
					required: false,
				},
			],
			where: {
				delay_minutes: { [Op.gt]: 0 },
			},
			group: [col("delayCategory.name")],
			order: [[literal('"total_delay_minutes"'), "DESC"]],
			raw: true,
		});

		const totalMinutes = delayData.reduce(
			(sum: number, row: any) => sum + Number(row.total_delay_minutes || 0),
			0,
		);

		return delayData.map((row: any) => ({
			category: row.category || "Unknown",
			count: Number(row.incident_count || 0),
			total_delay_minutes: Number(row.total_delay_minutes || 0),
			percentage:
				totalMinutes === 0
					? 0
					: Number(
							(
								(Number(row.total_delay_minutes || 0) / totalMinutes) *
								100
							).toFixed(2),
						),
		}));
	},
	// On-time Performance
	async getOnTimePerformance(
		filters: AnalyticsFilters,
	): Promise<OnTimePerformanceDataPoint[]> {
		const { startDate, endDate } = getDateRangeByFilter(
			filters.time_filter || "monthly",
		);

		const whereClause: Record<string, unknown> = {
			date: {
				[Op.between]: [startDate, endDate],
			},
		};

		if (filters.origin_airport) {
			whereClause.origin_airport = filters.origin_airport.toUpperCase();
		}

		if (filters.destination_airport) {
			whereClause.destination_airport =
				filters.destination_airport.toUpperCase();
		}

		const rows = await AnalyticsSummary.findAll({
			attributes: [
				"date",
				[fn("SUM", col("total_flights")), "totalFlights"],
				[fn("SUM", col("delayed_flights")), "delayedFlights"],
			],
			where: whereClause,
			group: ["date"],
			order: [["date", "ASC"]],
			raw: true,
		});

		return rows.map((row: any) => {
			const totalFlights = Number(row.totalFlights || 0);
			const delayedFlights = Number(row.delayedFlights || 0);
			const onTimeFlights = totalFlights - delayedFlights;

			const onTimePercentage =
				totalFlights === 0
					? 0
					: Number(((onTimeFlights / totalFlights) * 100).toFixed(2));

			return {
				date: row.date as string,
				period: row.date as string,
				on_time_percentage: onTimePercentage,
				total_flights: totalFlights,
				on_time_flights: onTimeFlights,
			};
		});
	},

	// Active Flights Table
	async getActiveFlightsInformation(
		filters: AnalyticsFilters,
	): Promise<PaginatedResponse<ActiveFlight>> {
		const page = Math.max(1, filters.page || DEFAULT_PAGINATION.page);

		const limit = Math.min(
			filters.limit || DEFAULT_PAGINATION.limit,
			DEFAULT_PAGINATION.max_limit,
		);

		const offset = (page - 1) * limit;

		const today = new Date().toISOString().split("T")[0];

		const whereClause: Record<string, unknown> = {
			flight_date: today,
			status: {
				[Op.in]: ACTIVE_FLIGHT_STATUSES,
			},
		};

		if (filters.origin_airport) {
			whereClause.origin_airport = filters.origin_airport.toUpperCase();
		}

		if (filters.destination_airport) {
			whereClause.destination_airport =
				filters.destination_airport.toUpperCase();
		}

		const sortOrder =
			(filters.sort_order || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC";

		let order: [string, string][] = [["scheduled_departure", sortOrder]];

		if (filters.sort_by === "route") {
			order = [
				["origin_airport", sortOrder],
				["destination_airport", sortOrder],
			];
		} else if (filters.sort_by === "status") {
			order = [["status", sortOrder]];
		}

		const { rows, count } = await Flight.findAndCountAll({
			where: whereClause,
			limit,
			offset,
			order,
			attributes: [
				"id",
				"flight_number",
				"airline_code",
				"origin_airport",
				"destination_airport",
				"aircraft_id",
				"status",
				"scheduled_departure",
				"scheduled_arrival",
				"estimated_departure",
				"estimated_arrival",
				"gate_departure",
				"gate_arrival",
				"flight_date",
			],
			raw: true,
		});

		return {
			data: rows as unknown as ActiveFlight[],
			pagination: {
				total: count,
				page,
				limit,
				total_pages: Math.ceil(count / limit),
			},
		};
	},

	// calculate analytics to store in summary table
	async getSummaryTable() {
		const result = await Flight.findAll({
			attributes: [
				"flight_date",
				"origin_airport",
				"destination_airport",
				"aircraft_id",
				[fn("COUNT", col("Flight.id")), "total_flights"],
				[
					fn(
						"SUM",
						literal(
							`CASE WHEN "operationalEvents"."delay_minutes" > 0 THEN 1 ELSE 0 END`,
						),
					),
					"delayed_flights",
				],
				[
					fn("COALESCE", fn("AVG", col("operationalEvents.delay_minutes")), 0),
					"avg_delay_minutes",
				],
				[
					fn(
						"COALESCE",
						fn("SUM", col("flightPerformances.flight_time_minutes")),
						0,
					),
					"total_flight_hours",
				],
				[
					fn(
						"COALESCE",
						fn("AVG", col("flightPerformances.load_factor_pct")),
						0,
					),
					"avg_load_factor_pct",
				],
				[
					fn(
						"COALESCE",
						fn("AVG", col("flightPerformances.fuel_efficiency_kg_per_km")),
						0,
					),
					"avg_fuel_efficiency",
				],
			],
			include: [
				{
					model: OperationalEvent,
					as: "operationalEvents",
					attributes: [],
					required: false,
				},
				{
					model: FlightPerformance,
					as: "flightPerformances",
					attributes: [],
					required: false,
				},
			],
			group: [
				"Flight.flight_date",
				"Flight.origin_airport",
				"Flight.destination_airport",
				"Flight.aircraft_id",
			],
			raw: true,
		});
		for (const row of result) {
			const data = row as unknown as FlightAnalyticsRow;
			await AnalyticsSummary.upsert({
				date: new Date(data.flight_date).toISOString().slice(0, 10),
				origin_airport: data.origin_airport,
				destination_airport: data.destination_airport,
				aircraft_id: data.aircraft_id,
				total_flights: data.total_flights,
				delayed_flights: data.delayed_flights,
				avg_delay_minutes: data.avg_delay_minutes,
				total_flight_hours: data.total_flight_hours,
				avg_load_factor_pct: data.avg_load_factor_pct,
				avg_fuel_efficiency: data.avg_fuel_efficiency,
			});
		}
	},

	// Export Data
	async getExportData(filters: any): Promise<any[]> {
		const whereClause: Record<string, unknown> = {};

		if (filters.startDate && filters.endDate) {
			whereClause.date = {
				[Op.between]: [filters.startDate, filters.endDate],
			};
		}

		if (filters.origin_airport) {
			whereClause.origin_airport = filters.origin_airport.toUpperCase();
		}

		if (filters.destination_airport) {
			whereClause.destination_airport =
				filters.destination_airport.toUpperCase();
		}

		if (filters.aircraft_id) {
			whereClause.aircraft_id = filters.aircraft_id;
		}

		return AnalyticsSummary.findAll({
			where: whereClause,
			order: [["date", "DESC"]],
			raw: true,
		});
	},
};
