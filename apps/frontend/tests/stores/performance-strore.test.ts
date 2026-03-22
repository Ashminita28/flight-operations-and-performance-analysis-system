import { describe, it, expect, beforeEach, vi } from "vitest";
import { usePerformanceStore } from "../../src/store/performance-store";
import { performanceService } from "../../src/services/performance-service";
import type { Performance } from "../../src/types/flight-types";

vi.mock("../../src/services/performance-service");

describe("Performance Store", () => {
	const mockPerformance: Performance = {
		id: "1",
		flight_id: "FL1",
		fuel_planned_kg: 1000,
		fuel_used_kg: 900,
		fuel_remaining_kg: 100,
		fuel_efficiency_kg_per_km: 5,
		block_time_minutes: 120,
		flight_time_minutes: 110,
		distance_km: 500,
		passengers_count: 150,
		cargo_weight_kg: 2000,
		payload_kg: 3000,
		load_factor_pct: 85,
		co2_emissions_kg: 400,
	};

	beforeEach(() => {
		usePerformanceStore.setState({
			performance: null,
			loading: false,
			error: null,
		});

		vi.clearAllMocks();
	});

	it("fetchPerformance success", async () => {
		vi.mocked(performanceService.get).mockResolvedValue(mockPerformance);

		await usePerformanceStore.getState().fetchPerformance("FL1");

		const state = usePerformanceStore.getState();

		expect(state.performance).toEqual(mockPerformance);
		expect(state.loading).toBe(false);
		expect(state.error).toBeNull();
	});

	it("fetchPerformance error", async () => {
		vi.mocked(performanceService.get).mockRejectedValue(new Error("failed"));

		await usePerformanceStore.getState().fetchPerformance("FL1");

		const state = usePerformanceStore.getState();

		expect(state.error).toBe("failed");
		expect(state.loading).toBe(false);
	});

	it("createPerformance success", async () => {
		vi.mocked(performanceService.create).mockResolvedValue(undefined);
		vi.mocked(performanceService.get).mockResolvedValue(mockPerformance);

		await usePerformanceStore.getState().createPerformance("FL1", {});

		const state = usePerformanceStore.getState();

		expect(state.performance).toEqual(mockPerformance);
	});
});
