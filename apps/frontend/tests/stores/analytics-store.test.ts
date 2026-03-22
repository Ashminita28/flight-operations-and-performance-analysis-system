import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAnalyticsStore } from "../../src/store/analytics-store";
import { api, type ApiResponse } from "../../src/api/api";
import type { DashboardCounters } from "../../src/types/analytics-types";

vi.mock("../../src/api/api");

const mockedApi = vi.mocked(api);

describe("Analytics Store", () => {
	beforeEach(() => {
		useAnalyticsStore.setState({
			counters: null,
			onTimePerformanceData: [],
			delayAnalysisData: [],
			activeFlights: [],
			pagination: { total: 0, page: 1, limit: 20, total_pages: 0 },
			filters: { page: 1, limit: 20, time_filter: "daily" },
			chartTimeFilter: "monthly",
			loading: false,
			error: null,
			exporting: false,
			exportError: null,
		});

		vi.clearAllMocks();
	});

	it("fetchCounters success", async () => {
		mockedApi.mockResolvedValueOnce({
			success: true,
			message: "ok",
			data: {
				total_flights: 10,
				active_flights: 5,
				on_time_flights: 8,
				delayed_flights: 2,
				on_time_performance_pct: 80,
			},
		} as ApiResponse<DashboardCounters>);

		await useAnalyticsStore.getState().fetchCounters();

		expect(useAnalyticsStore.getState().counters?.total_flights).toBe(10);
	});

	it("fetchCounters error", async () => {
		mockedApi.mockRejectedValueOnce(new Error("fail"));

		await useAnalyticsStore.getState().fetchCounters();

		expect(useAnalyticsStore.getState().error).toBe("fail");
	});
});
