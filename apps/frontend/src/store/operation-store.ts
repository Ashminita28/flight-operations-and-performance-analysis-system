import { create } from "zustand";
import { operationService } from "@/services/operation-service";
import type { OperationalEvent } from "@/types/flight-types";

interface State {
	events: OperationalEvent[];
	loading: boolean;
	error: string | null;

	fetchEvents: (flightId: string) => Promise<void>;
	fetchAllEvents: () => Promise<void>;
	addEvent: (flightId: string, payload: unknown) => Promise<void>;
}

let controller: AbortController | null = null;

export const useOperationStore = create<State>((set, get) => ({
	events: [],
	loading: false,
	error: null,

	fetchEvents: async flightId => {
		controller?.abort();
		controller = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await operationService.getEvents(
				flightId,
				controller.signal,
			);
			set({ events: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	addEvent: async (flightId, payload) => {
		set({ loading: true, error: null });

		try {
			await operationService.createEvent(flightId, payload);
			await get().fetchEvents(flightId);
		} catch (err) {
			if (err instanceof Error) set({ error: err.message });
		} finally {
			set({ loading: false });
		}
	},
	fetchAllEvents: async () => {
		controller?.abort();
		controller = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await operationService.getAllEvents(controller.signal);
			set({ events: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},
}));
