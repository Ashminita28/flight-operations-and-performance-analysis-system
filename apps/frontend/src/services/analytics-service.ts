import { api, type ApiResponse } from "@/api/api";
import type {
	DashboardCounters,
	OnTimePerformanceDataPoint,
	DelayAnalysisDataPoint,
	AnalyticsFilters,
	ActiveFlightsResponse,
	ChartTimeFilter,
} from "@/types/analytics-types";
import type { ExportReportPayload } from "@/types/export-report-types";

function buildQuery(params: AnalyticsFilters): string {
	const query = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			query.set(key, String(value));
		}
	});

	return query.toString();
}

export const analyticsService = {
	getCounters: async (filters: AnalyticsFilters, signal?: AbortSignal) => {
		const qs = buildQuery({
			time_filter: filters.time_filter,
			origin_airport: filters.origin_airport,
			destination_airport: filters.destination_airport,
		});

		const res = await api<ApiResponse<DashboardCounters>>(
			`/analytics/counters?${qs}`,
			{ signal },
		);

		if (!res.data) throw new Error("Invalid counters response");

		return res.data;
	},

	getOnTimePerformance: async (
		filter: ChartTimeFilter,
		filters: AnalyticsFilters,
		signal?: AbortSignal,
	) => {
		const qs = buildQuery({
			time_filter: filter,
			origin_airport: filters.origin_airport,
			destination_airport: filters.destination_airport,
		});

		const res = await api<ApiResponse<OnTimePerformanceDataPoint[]>>(
			`/analytics/on-time-performance?${qs}`,
			{ signal },
		);

		if (!res.data) throw new Error("Invalid performance response");

		return res.data;
	},

	getDelayAnalysis: async (
		filter: ChartTimeFilter,
		filters: AnalyticsFilters,
		signal?: AbortSignal,
	) => {
		const qs = buildQuery({
			time_filter: filter,
			origin_airport: filters.origin_airport,
			destination_airport: filters.destination_airport,
		});

		const res = await api<ApiResponse<DelayAnalysisDataPoint[]>>(
			`/analytics/delay-analysis?${qs}`,
			{ signal },
		);

		if (!res.data) throw new Error("Invalid delay response");

		return res.data;
	},

	getActiveFlights: async (filters: AnalyticsFilters, signal?: AbortSignal) => {
		const qs = buildQuery(filters);

		const res = await api<ApiResponse<ActiveFlightsResponse>>(
			`/analytics/active-flights?${qs}`,
			{ signal },
		);

		if (!res.data) throw new Error("Invalid flights response");

		return res.data;
	},

	exportReport: async (payload: ExportReportPayload) => {
		const res = await api<ApiResponse<{ job_id: string }>>(
			"/analytics/export-report",
			{
				method: "POST",
				body: JSON.stringify(payload),
			},
		);

		if (!res.data) throw new Error("Invalid export response");

		return res.data;
	},
};
