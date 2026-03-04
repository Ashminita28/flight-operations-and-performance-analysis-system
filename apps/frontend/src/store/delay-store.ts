import { create } from "zustand";
import { api } from "../api/api";
import type { DelayCategory } from "@/types/flight-types";

interface DelayState {
	categories: DelayCategory[];
	loading: boolean;
	error: string | null;

	fetchCategories: () => Promise<void>;
	createCategory: (payload: { code: string; name: string }) => Promise<void>;
	deleteCategory: (id: string) => Promise<void>;
}

export const useDelayStore = create<DelayState>(set => ({
	categories: [],
	loading: false,
	error: null,

	fetchCategories: async () => {
		set({ loading: true, error: null });

		try {
			const res = await api<{ success: boolean; data: DelayCategory[] }>(
				"/delays",
			);

			set({ categories: res.data, loading: false });
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},

	createCategory: async payload => {
		set({ loading: true, error: null });

		try {
			const data = await api("/delays", {
				method: "POST",
				body: JSON.stringify(payload),
			});

			set(state => ({
				categories: [...state.categories, data],
				loading: false,
			}));
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},

	deleteCategory: async id => {
		set({ loading: true, error: null });

		try {
			await api(`/delays/${id}`, {
				method: "DELETE",
			});

			set(state => ({
				categories: state.categories.filter(c => c.id !== id),
				loading: false,
			}));
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},
}));
