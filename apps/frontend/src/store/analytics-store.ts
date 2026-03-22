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
	ChartTimeFilter,
} from "@/types/analytics-types";

import type { ExportReportPayload } from "@/types/export-report-types";
import type { Paginationpagination } from "@/types/flight-types";

interface AnalyticsStore {
	counters: DashboardCounters | null;
	onTimePerformanceData: OnTimePerformanceDataPoint[];
	delayAnalysisData: DelayAnalysisDataPoint[];
	activeFlights: ActiveFlightData[];
	pagination: Paginationpagination;
	filters: AnalyticsFilters;
	chartTimeFilter: ChartTimeFilter;

	countersLoading: boolean;
	performanceLoading: boolean;
	delayLoading: boolean;
	flightsLoading: boolean;

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

const isAbortError = (err: unknown): err is DOMException =>
	err instanceof DOMException && err.name === "AbortError";

function buildQueryString(params: Record<string, unknown>): string {
	const query = new URLSearchParams();

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null) {
			query.set(key, String(value));
		}
	}

	return query.toString();
}

let countersController: AbortController | null = null;
let performanceController: AbortController | null = null;
let delayController: AbortController | null = null;
let flightsController: AbortController | null = null;

/* -------------------- STORE -------------------- */

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
	counters: null,
	onTimePerformanceData: [],
	delayAnalysisData: [],
	activeFlights: [],
	pagination: DEFAULT_PAGINATION,
	filters: DEFAULT_FILTERS,
	chartTimeFilter: "monthly",

	countersLoading: false,
	performanceLoading: false,
	delayLoading: false,
	flightsLoading: false,

	error: null,
	exporting: false,
	exportError: null,

	/* ---------- COUNTERS ---------- */
	fetchCounters: async filters => {
		const params = filters ?? get().filters;
		countersController?.abort();
		countersController = new AbortController();

		set({ countersLoading: true });

		try {
			const qs = buildQueryString({
				time_filter: params.time_filter,
				origin_airport: params.origin_airport,
				destination_airport: params.destination_airport,
			});

			const res = await api<AnalyticsCountersResponse>(
				`/analytics/counters?${qs}`,
				{ signal: countersController.signal },
			);

			set({ counters: res.data });
		} catch (err: unknown) {
			if (!isAbortError(err)) {
				const message =
					err instanceof Error ? err.message : "Failed to load counters";
				set({ error: message });
			}
		} finally {
			set({ countersLoading: false });
		}
	},

	/* ---------- PERFORMANCE ---------- */
	fetchOnTimePerformance: async timeFilter => {
		const filter = timeFilter ?? get().chartTimeFilter;

		performanceController?.abort();
		performanceController = new AbortController();

		set({ performanceLoading: true });

		try {
			const qs = buildQueryString({ time_filter: filter });

			const res = await api<AnalyticsChartResponse>(
				`/analytics/on-time-performance?${qs}`,
				{ signal: performanceController.signal },
			);

			set({
				onTimePerformanceData: res.data as OnTimePerformanceDataPoint[],
			});
		} catch (err: unknown) {
			if (!isAbortError(err)) {
				const message =
					err instanceof Error ? err.message : "Failed to load performance";
				set({ error: message });
			}
		} finally {
			set({ performanceLoading: false });
		}
	},

	/* ---------- DELAY ---------- */
	fetchDelayAnalysis: async timeFilter => {
		const filter = timeFilter ?? get().chartTimeFilter;

		delayController?.abort();
		delayController = new AbortController();

		set({ delayLoading: true });

		try {
			const qs = buildQueryString({ time_filter: filter });

			const res = await api<AnalyticsChartResponse>(
				`/analytics/delay-analysis?${qs}`,
				{ signal: delayController.signal },
			);

			set({
				delayAnalysisData: res.data as DelayAnalysisDataPoint[],
			});
		} catch (err: unknown) {
			if (!isAbortError(err)) {
				const message =
					err instanceof Error ? err.message : "Failed to load delay data";
				set({ error: message });
			}
		} finally {
			set({ delayLoading: false });
		}
	},

	/* ---------- ACTIVE FLIGHTS ---------- */
	fetchActiveFlights: async filters => {
		const params = filters ?? get().filters;

		flightsController?.abort();
		flightsController = new AbortController();

		set({ flightsLoading: true });

		try {
			const qs = buildQueryString({
				page: params.page,
				limit: params.limit,
				origin_airport: params.origin_airport,
				destination_airport: params.destination_airport,
				sort_by: params.sort_by,
				sort_order: params.sort_order,
			});

			const res = await api<ActiveFlightsResponse>(
				`/analytics/active-flights?${qs}`,
				{ signal: flightsController.signal },
			);

			set({
				activeFlights: res.data,
				pagination: res.pagination ?? DEFAULT_PAGINATION,
			});
		} catch (err: unknown) {
			if (!isAbortError(err)) {
				const message =
					err instanceof Error ? err.message : "Failed to load flights";
				set({ error: message });
			}
		} finally {
			set({ flightsLoading: false });
		}
	},

	/* ---------- EXPORT ---------- */
	initiateExport: async payload => {
		set({ exporting: true, exportError: null });

		try {
			const res = await api<{ data: { job_id: string } }>(
				"/analytics/export-report",
				{
					method: "POST",
					body: JSON.stringify(payload),
				},
			);

			return { job_id: res.data.job_id };
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Export failed";
			set({ exportError: message });
			throw new Error(message);
		} finally {
			set({ exporting: false });
		}
	},

	/* ---------- STATE ---------- */
	setFilters: newFilters => {
		set(state => ({
			filters: { ...state.filters, ...newFilters },
		}));
	},

	setChartTimeFilter: filter => {
		set({ chartTimeFilter: filter });
	},

	clearError: () => {
		set({ error: null, exportError: null });
	},
}));
