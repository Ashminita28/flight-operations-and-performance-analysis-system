import { create } from "zustand";
import { flightService } from "@/services/flight-service";
import type {
	Flight,
	FlightQueryParams,
	Paginationpagination,
} from "@/types/flight-types";
import { DEFAULT_PAGINATION } from "@/constants/table-constants";

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

let fetchController: AbortController | null = null;
let detailController: AbortController | null = null;
let lastFlightsKey = "";

export const useFlightStore = create<State>((set, get) => ({
	flights: [],
	selectedFlight: null,
	aircraftMap: {},
	pagination: DEFAULT_PAGINATION,
	filters: { page: 1, limit: 10 },
	loading: false,
	error: null,

	fetchFlights: async params => {
		const current = get().filters;

		const merged: FlightQueryParams = {
			page: params?.page ?? current.page ?? 1,
			limit: params?.limit ?? current.limit ?? 10,
			status: params?.status ?? current.status,
			sort_by: params?.sort_by ?? current.sort_by,
			sort_order: params?.sort_order ?? current.sort_order,
			flight_number: params?.flight_number ?? current.flight_number,
		};

		const key = JSON.stringify(merged);

		// prevent duplicate calls
		if (key === lastFlightsKey) return;
		lastFlightsKey = key;

		// cancel previous request
		fetchController?.abort();
		fetchController = new AbortController();

		set({ loading: true, error: null });

		try {
			const res = await flightService.getAll(merged, fetchController.signal);

			set({
				flights: res.data,
				pagination: res.pagination ?? DEFAULT_PAGINATION,
				filters: merged,
			});
		} catch (err) {
			if (err instanceof DOMException && err.name === "AbortError") return;

			set({
				error: err instanceof Error ? err.message : "Failed to fetch flights",
			});
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
