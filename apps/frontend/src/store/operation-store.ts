import { create } from "zustand";
import { api } from "../api/api";
import type { OperationalEvent } from "@/types/types";

interface OperationStore {
	events: OperationalEvent[];
	loading: boolean;
	error: string | null;

	fetchEvents: (flight_id: string) => Promise<void>;
	addEvent: (flightId: string, eventData: any) => Promise<void>;
}

export const useOperationStore = create<OperationStore>(set => ({
	events: [],
	loading: false,
	error: null,

	fetchEvents: async (flight_id: string) => {
		set({ loading: true, error: null });

		try {
			const res = await api<{ success: boolean; data: OperationalEvent[] }>(
				`/operations/${flight_id}/events`,
			);
			set({ events: res.data, loading: false });
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},

	addEvent: async (flightId, eventData) => {
		set({ loading: true, error: null });

		try {
			await api(`/operations/${flightId}/events`, {
				method: "POST",
				body: JSON.stringify(eventData),
			});

			await useOperationStore.getState().fetchEvents(flightId);
		} catch (err: any) {
			set({ error: err.message, loading: false });
		}
	},
}));
