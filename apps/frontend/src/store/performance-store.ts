import { create } from "zustand";
import { performanceService } from "@/services/performance-service";
import type { Performance } from "@/types/flight-types";

interface State {
	performance: Performance | null;
	performances: Performance[];
	loading: boolean;
	error: string | null;

	fetchPerformance: (flightId: string) => Promise<void>;
	fetchAllPerformance: () => Promise<void>;
	createPerformance: (flightId: string, payload: unknown) => Promise<void>;
}

let controller: AbortController | null = null;

export const usePerformanceStore = create<State>((set, get) => ({
	performance: null,
	performances: [],
	loading: false,
	error: null,

	fetchPerformance: async flightId => {
		controller?.abort();
		controller = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await performanceService.get(flightId, controller.signal);
			set({ performance: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	createPerformance: async (flightId, payload) => {
		set({ loading: true, error: null });

		try {
			await performanceService.create(flightId, payload);
			await get().fetchPerformance(flightId);
		} catch (err) {
			if (err instanceof Error) set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},
	fetchAllPerformance: async () => {
		controller?.abort();
		controller = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await performanceService.getAllPerformance(
				controller.signal,
			);
			set({ performances: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},
}));
