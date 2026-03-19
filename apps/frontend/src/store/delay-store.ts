import { create } from "zustand";
import { delayService } from "@/services/delay-service";
import type { DelayCategory } from "@/types/types";

interface State {
	categories: DelayCategory[];
	loading: boolean;
	error: string | null;

	fetchCategories: () => Promise<void>;
	createCategory: (payload: { code: string; name: string }) => Promise<void>;
	deleteCategory: (id: string) => Promise<void>;
}

let controller: AbortController | null = null;

export const useDelayStore = create<State>((set, get) => ({
	categories: [],
	loading: false,
	error: null,

	fetchCategories: async () => {
		controller?.abort();
		controller = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await delayService.getAll(controller.signal);
			set({ categories: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	createCategory: async payload => {
		set({ loading: true, error: null });

		try {
			const created = await delayService.create(payload);
			set({ categories: [...get().categories, created] });
		} catch (err) {
			if (err instanceof Error) set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},

	deleteCategory: async id => {
		set({ loading: true, error: null });

		try {
			await delayService.delete(id);
			set({
				categories: get().categories.filter(c => c.id !== id),
			});
		} catch (err) {
			if (err instanceof Error) set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},
}));
