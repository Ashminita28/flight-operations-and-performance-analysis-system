import { create } from "zustand";
import { analyticsService } from "@/services/analytics-service";
import type {
	DashboardCounters,
	OnTimePerformanceDataPoint,
	DelayAnalysisDataPoint,
	ActiveFlightData,
	AnalyticsFilters,
	ChartTimeFilter,
	ExportReportPayload,
} from "@/types/analytics-types";
import type { Paginationpagination } from "@/types/types";

interface State {
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
	fetchOnTimePerformance: (filter?: ChartTimeFilter) => Promise<void>;
	fetchDelayAnalysis: (filter?: ChartTimeFilter) => Promise<void>;
	fetchActiveFlights: () => Promise<void>;
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

export const useAnalyticsStore = create<State>((set, get) => {
	let controller: AbortController | null = null;

	const createController = () => {
		controller?.abort();
		controller = new AbortController();
		return controller;
	};

	return {
		counters: null,
		onTimePerformanceData: [],
		delayAnalysisData: [],
		activeFlights: [],
		pagination: DEFAULT_PAGINATION,
		filters: { page: 1, limit: 20, time_filter: "daily" },
		chartTimeFilter: "monthly",
		loading: false,
		error: null,
		exporting: false,
		exportError: null,

		fetchCounters: async overrideFilters => {
			const ctrl = createController();

			set({ loading: true, error: null });

			try {
				const filters = overrideFilters ?? get().filters;

				const data = await analyticsService.getCounters(filters, ctrl.signal);

				set({ counters: data });
			} catch (err) {
				if (err instanceof Error && err.name !== "AbortError") {
					set({ error: err.message });
				}
			} finally {
				set({ loading: false });
			}
		},

		fetchOnTimePerformance: async filter => {
			const ctrl = createController();

			set({ loading: true, error: null });

			try {
				const data = await analyticsService.getOnTimePerformance(
					filter ?? get().chartTimeFilter,
					get().filters,
					ctrl.signal,
				);

				set({ onTimePerformanceData: data });
			} catch (err) {
				if (err instanceof Error && err.name !== "AbortError") {
					set({ error: err.message });
				}
			} finally {
				set({ loading: false });
			}
		},

		fetchDelayAnalysis: async filter => {
			const ctrl = createController();

			set({ loading: true, error: null });

			try {
				const data = await analyticsService.getDelayAnalysis(
					filter ?? get().chartTimeFilter,
					get().filters,
					ctrl.signal,
				);

				set({ delayAnalysisData: data });
			} catch (err) {
				if (err instanceof Error && err.name !== "AbortError") {
					set({ error: err.message });
				}
			} finally {
				set({ loading: false });
			}
		},

		fetchActiveFlights: async () => {
			const ctrl = createController();

			set({ loading: true, error: null });

			try {
				const res = await analyticsService.getActiveFlights(
					get().filters,
					ctrl.signal,
				);

				set({
					activeFlights: res.data ?? [],
					pagination: res.pagination ?? DEFAULT_PAGINATION,
				});
			} catch (err) {
				if (err instanceof Error && err.name !== "AbortError") {
					set({ error: err.message });
				}
			} finally {
				set({ loading: false });
			}
		},

		initiateExport: async payload => {
			set({ exporting: true, exportError: null });

			try {
				const data = await analyticsService.exportReport(payload);
				return data;
			} catch (err) {
				if (err instanceof Error) {
					set({ exportError: err.message });
					throw err;
				}
				throw new Error("Export failed");
			} finally {
				set({ exporting: false });
			}
		},

		setFilters: filters =>
			set(state => ({
				filters: { ...state.filters, ...filters },
			})),

		setChartTimeFilter: filter => set({ chartTimeFilter: filter }),

		clearError: () => set({ error: null, exportError: null }),
	};
});
