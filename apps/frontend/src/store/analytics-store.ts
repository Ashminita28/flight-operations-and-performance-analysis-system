import { create } from "zustand";
import { api } from "@/api/api";
import type {
	DashboardCounters,
	OnTimePerformanceDataPoint,
	DelayAnalysisDataPoint,
	ActiveFlightData,
	AnalyticsFilters,
	AnalyticsCountersResponse,
	AnalyticsChartResponse,
	ActiveFlightsResponse,
	ExportReportPayload,
	ChartTimeFilter,
} from "@/types/analytics-types";
import type { Paginationpagination } from "@/types/types";

interface AnalyticsStore {
	counters: DashboardCounters | null;
	onTimePerformanceData: OnTimePerformanceDataPoint[];
	delayAnalysisData: DelayAnalysisDataPoint[];
	activeFlights: ActiveFlightData[];
	pagination: Paginationpagination;
	filters: AnalyticsFilters;
	chartTimeFilter: ChartTimeFilter;
	loading: boolean;
	error: string | null;
	exporting: boolean;
	exportError: string | null;
	fetchCounters: (filters?: AnalyticsFilters) => Promise<void>;
	fetchOnTimePerformance: (timeFilter?: ChartTimeFilter) => Promise<void>;
	fetchDelayAnalysis: (timeFilter?: ChartTimeFilter) => Promise<void>;
	fetchActiveFlights: (filters?: AnalyticsFilters) => Promise<void>;
	initiateExport: (payload: ExportReportPayload) => Promise<{ job_id: string }>;
	setFilters: (filters: Partial<AnalyticsFilters>) => void;
	setChartTimeFilter: (filter: ChartTimeFilter) => void;
	clearError: () => void;
}

const DEFAULT_PAGINATION: Paginationpagination = {
	total: 0,
	page: 1,
	limit: 20,
	total_pages: 0,
};

const DEFAULT_FILTERS: AnalyticsFilters = {
	page: 1,
	limit: 20,
	time_filter: "daily",
};

function buildQueryString(params: Record<string, any>): string {
	const query = new URLSearchParams();
	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			query.set(key, String(value));
		}
	});
	return query.toString();
}

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
	counters: null,
	onTimePerformanceData: [],
	delayAnalysisData: [],
	activeFlights: [],
	pagination: DEFAULT_PAGINATION,
	filters: DEFAULT_FILTERS,
	chartTimeFilter: "monthly",
	loading: false,
	error: null,
	exporting: false,
	exportError: null,

	// Fetch dashboard counters for current date or specified time period
	fetchCounters: async (filters?: AnalyticsFilters) => {
		set({ loading: true, error: null });
		try {
			const params = filters ?? get().filters;
			const qs = buildQueryString({
				time_filter: params.time_filter,
				origin_airport: params.origin_airport,
				destination_airport: params.destination_airport,
			});
			const res = await api<AnalyticsCountersResponse>(
				`/analytics/counters?${qs}`,
			);
			set({ counters: res.data });
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to load counters";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	// Fetch on-time performance data for bar chart
	fetchOnTimePerformance: async (timeFilter?: ChartTimeFilter) => {
		set({ loading: true, error: null });
		try {
			const filter = timeFilter ?? get().chartTimeFilter;
			const qs = buildQueryString({
				time_filter: filter,
				origin_airport: get().filters.origin_airport,
				destination_airport: get().filters.destination_airport,
			});
			const res = await api<AnalyticsChartResponse>(
				`/analytics/on-time-performance?${qs}`,
			);
			set({
				onTimePerformanceData: res.data as OnTimePerformanceDataPoint[],
			});
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to load performance data";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	// Fetch delay analysis data for pie chart
	fetchDelayAnalysis: async (timeFilter?: ChartTimeFilter) => {
		set({ loading: true, error: null });
		try {
			const filter = timeFilter ?? get().chartTimeFilter;
			const qs = buildQueryString({
				time_filter: filter,
				origin_airport: get().filters.origin_airport,
				destination_airport: get().filters.destination_airport,
			});
			const res = await api<AnalyticsChartResponse>(
				`/analytics/delay-analysis?${qs}`,
			);
			set({ delayAnalysisData: res.data as DelayAnalysisDataPoint[] });
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to load delay analysis";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	// Fetch active flights for current date with pagination
	fetchActiveFlights: async (filters?: AnalyticsFilters) => {
		set({ loading: true, error: null });
		try {
			const params = filters ?? get().filters;
			const qs = buildQueryString({
				page: params.page || 1,
				limit: params.limit || 20,
				origin_airport: params.origin_airport,
				destination_airport: params.destination_airport,
				sort_by: params.sort_by,
				sort_order: params.sort_order,
			});
			const res = await api<ActiveFlightsResponse>(
				`/analytics/active-flights?${qs}`,
			);
			set({
				activeFlights: res.data,
				pagination: res.pagination ?? DEFAULT_PAGINATION,
				filters: params,
			});
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to load active flights";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	// Initiate CSV export report
	initiateExport: async (payload: ExportReportPayload) => {
		set({ exporting: true, exportError: null });
		try {
			const response = await api<{ data: { job_id: string } }>(
				"/analytics/export-report",
				{
					method: "POST",
					body: JSON.stringify(payload),
				},
			);
			return { job_id: response.data.job_id };
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to initiate export report";
			set({ exportError: message });
			throw new Error(message);
		} finally {
			set({ exporting: false });
		}
	},

	// Update filter
	setFilters: (newFilters: Partial<AnalyticsFilters>) => {
		set(state => ({
			filters: { ...state.filters, ...newFilters },
		}));
	},

	// Set chart time filter
	setChartTimeFilter: (filter: ChartTimeFilter) => {
		set({ chartTimeFilter: filter });
	},

	// Clear error message
	clearError: () => {
		set({ error: null, exportError: null });
	},
}));
