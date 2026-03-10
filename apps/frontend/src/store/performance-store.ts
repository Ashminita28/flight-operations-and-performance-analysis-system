import { create } from "zustand";
import { api } from "../api/api";
import type { Performance } from "@/types/types";

interface PerformanceStore {
	performance: Performance | null;
	loading: boolean;
	error: string | null;

	fetchPerformance: (flight_id: string) => Promise<void>;
	createPerformance: (flight_id: string, performanceData: any) => Promise<void>;
}

export const usePerformanceStore = create<PerformanceStore>(set => ({
	performance: null,
	loading: false,
	error: null,

	fetchPerformance: async (flight_id: string) => {
		set({ loading: true, error: null });

		try {
			const res = await api<{ success: boolean; data: Performance }>(
				`/performance/${flight_id}`,
			);
			set({ performance: res.data, loading: false });
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},

	createPerformance: async (flight_id, performanceData) => {
		set({ loading: true, error: null });

		try {
			await api(`/performance/${flight_id}`, {
				method: "POST",
				body: JSON.stringify(performanceData),
			});

			await usePerformanceStore.getState().fetchPerformance(flight_id);
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},
}));
