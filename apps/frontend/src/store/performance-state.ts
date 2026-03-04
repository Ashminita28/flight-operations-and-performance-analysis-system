import { create } from "zustand";
import { api } from "../api/api";
import type { Performance } from "@/types/flight-types";

interface PerformanceStore {
	performances: Performance[];
	loading: boolean;
	error: string | null;

	fetchPerformance: () => Promise<void>;
	createPerformance: (data: any) => Promise<void>;
}

export const usePerformanceStore = create<PerformanceStore>(set => ({
	performances: [],
	loading: false,
	error: null,

	fetchPerformance: async () => {
		set({ loading: true, error: null });

		try {
			const res = await api<{ success: boolean; data: Performance[] }>(
				"/performance",
			);
			set({ performances: res.data, loading: false });
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},

	createPerformance: async data => {
		set({ loading: true, error: null });

		try {
			await api("/performance", {
				method: "POST",
				body: JSON.stringify(data),
			});

			await usePerformanceStore.getState().fetchPerformance();
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},
}));
