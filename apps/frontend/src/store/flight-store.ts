import { create } from "zustand";
import { flightService } from "@/services/flight-service";
import type {
	Flight,
	FlightQueryParams,
	Paginationpagination,
} from "@/types/types";

interface State {
	flights: Flight[];
	selectedFlight: Flight | null;
	aircraftMap: Record<string, string>;
	pagination: Paginationpagination;
	filters: FlightQueryParams;
	loading: boolean;
	error: string | null;

	fetchFlights: (params?: FlightQueryParams) => Promise<void>;
	fetchFlightById: (id: string) => Promise<void>;
	fetchTodayFlights: () => Promise<void>;
	searchFlights: (flightNumber: string) => Promise<void>;
	fetchAircraftMap: () => Promise<void>;
	createFlight: (data: unknown) => Promise<void>;
	updateFlight: (id: string, data: unknown) => Promise<void>;
	deleteFlight: (id: string) => Promise<void>;
	changeStatus: (id: string, status: string) => Promise<void>;
	setFilters: (filters: FlightQueryParams) => void;
	clearError: () => void;
}

const DEFAULT_PAGINATION: Paginationpagination = {
	total: 0,
	page: 1,
	limit: 10,
	total_pages: 1,
};

let fetchController: AbortController | null = null;
let detailController: AbortController | null = null;

export const useFlightStore = create<State>((set, get) => ({
	flights: [],
	selectedFlight: null,
	aircraftMap: {},
	pagination: DEFAULT_PAGINATION,
	filters: { page: 1, limit: 10 },
	loading: false,
	error: null,

	fetchFlights: async params => {
		fetchController?.abort();
		fetchController = new AbortController();

		const activeFilters = params ?? get().filters;

		set({ loading: true, error: null });

		try {
			const res = await flightService.getAll(
				activeFilters,
				fetchController.signal,
			);

			set({
				flights: res.data,
				pagination: res.pagination ?? DEFAULT_PAGINATION,
				filters: activeFilters,
			});
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	fetchFlightById: async id => {
		detailController?.abort();
		detailController = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await flightService.getById(id, detailController.signal);
			set({ selectedFlight: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	fetchTodayFlights: async () => {
		set({ loading: true, error: null });
		try {
			const data = await flightService.getToday();
			set({ flights: data, pagination: DEFAULT_PAGINATION });
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	searchFlights: async flightNumber => {
		set({ loading: true, error: null });
		try {
			const data = await flightService.search(flightNumber);
			set({ flights: data, pagination: DEFAULT_PAGINATION });
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	fetchAircraftMap: async () => {
		try {
			const map = await flightService.getAircraftMap();
			set({ aircraftMap: map });
		} catch (err) {
			console.error("Aircraft map fetch failed", err);
		}
	},

	createFlight: async data => {
		set({ loading: true, error: null });
		try {
			await flightService.create(data);
			await get().fetchFlights();
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	updateFlight: async (id, data) => {
		set({ loading: true, error: null });
		try {
			await flightService.update(id, data);
			await get().fetchFlights();
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	deleteFlight: async id => {
		set({ loading: true, error: null });
		try {
			await flightService.delete(id);
			await get().fetchFlights();
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	changeStatus: async (id, status) => {
		set({ loading: true, error: null });
		try {
			await flightService.changeStatus(id, status);
			await get().fetchFlights();
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	setFilters: filters => set({ filters }),

	clearError: () => set({ error: null }),
}));
