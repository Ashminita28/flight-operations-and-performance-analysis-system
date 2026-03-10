import { create } from "zustand";
import { api } from "@/api/api";
import type {
	Flight,
	FlightsApiResponse,
	FlightListApiResponse,
	SingleFlightApiResponse,
	AircraftApiResponse,
	FlightQueryParams,
	Paginationpagination,
} from "@/types/types";

export interface UpdateFlight {
	flight_number: string;
	airline_code: string;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	scheduled_departure: string;
	scheduled_arrival: string;
	status: string;
	flight_date: string;
}

export interface CreateFlightBody {
	flight_number: string;
	airline_code: string;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	scheduled_departure: string;
	scheduled_arrival: string;
	status: string;
	flight_date: string;
	estimated_departure?: string | null;
	estimated_arrival?: string | null;
	actual_departure?: string | null;
	actual_arrival?: string | null;
	gate_departure?: string | null;
	gate_arrival?: string | null;
	is_return_flight?: boolean;
	created_by: string | null;
}

export type UpdateFlightBody = Partial<UpdateFlight>;

interface FlightStore {
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

	createFlight: (data: CreateFlightBody) => Promise<void>;

	updateFlight: (id: string, data: UpdateFlightBody) => Promise<void>;

	deleteFlight: (id: string) => Promise<void>;

	changeStatus: (id: string, status: string) => Promise<void>;

	setFilters: (filters: FlightQueryParams) => void;

	clearError: () => void;
}

const DEFAULT_pagination: Paginationpagination = {
	total: 0,
	page: 1,
	limit: 10,
	total_pages: 1,
};

const DEFAULT_FILTERS: FlightQueryParams = {
	page: 1,
	limit: 10,
	sort_by: "departure",
	sort_order: "ASC",
};

function buildQueryString(params: FlightQueryParams): string {
	const query = new URLSearchParams();
	if (params.page !== undefined) query.set("page", String(params.page));
	if (params.limit !== undefined) query.set("limit", String(params.limit));
	if (params.status) query.set("status", params.status);
	if (params.origin_airport) query.set("origin_airport", params.origin_airport);
	if (params.destination_airport)
		query.set("destination_airport", params.destination_airport);
	if (params.date) query.set("date", params.date);
	if (params.sort_by) query.set("sort_by", params.sort_by);
	if (params.sort_order) query.set("sort_order", params.sort_order);
	return query.toString();
}

export const useFlightStore = create<FlightStore>((set, get) => ({
	flights: [],
	selectedFlight: null,
	aircraftMap: {},
	pagination: DEFAULT_pagination,
	filters: DEFAULT_FILTERS,
	loading: false,
	error: null,

	fetchFlights: async (params?: FlightQueryParams) => {
		set({ loading: true, error: null });
		try {
			const activeParams = params ?? get().filters;
			const qs = buildQueryString(activeParams);
			const res = await api<FlightsApiResponse>(`/flights?${qs}`);
			set({
				flights: res.data,
				pagination: res.pagination ?? DEFAULT_pagination,
				filters: activeParams,
			});
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to load flights";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	fetchFlightById: async (id: string) => {
		set({ loading: true, error: null });
		try {
			const res = await api<SingleFlightApiResponse>(`/flights/${id}`);
			set({ selectedFlight: res.data });
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Flight not found";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	fetchTodayFlights: async () => {
		set({ loading: true, error: null });
		try {
			const res = await api<FlightListApiResponse>("/flights/today");
			set({ flights: res.data, pagination: DEFAULT_pagination });
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : "Failed to load today's flights";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	searchFlights: async (flightNumber: string) => {
		set({ loading: true, error: null });
		try {
			const encoded = encodeURIComponent(flightNumber);
			const res = await api<FlightListApiResponse>(
				`/flights/search?flight_number=${encoded}`,
			);
			set({ flights: res.data, pagination: DEFAULT_pagination });
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Search failed";
			set({ error: message });
		} finally {
			set({ loading: false });
		}
	},

	fetchAircraftMap: async () => {
		try {
			const res = await api<AircraftApiResponse>("/aircraft/");
			const map: Record<string, string> = {};
			res.data.forEach(a => {
				map[a.id] = `${a.registration} – ${a.model}`;
			});
			set({ aircraftMap: map });
		} catch (err) {
			console.error("Failed to fetch aircraft map", err);
		}
	},

	createFlight: async (data: CreateFlightBody) => {
		await api<SingleFlightApiResponse>("/flights/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		await get().fetchFlights(get().filters);
	},

	updateFlight: async (id: string, data: UpdateFlightBody) => {
		await api<SingleFlightApiResponse>(`/flights/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
		await get().fetchFlights(get().filters);
	},

	deleteFlight: async (id: string) => {
		await api<{ success: boolean }>(`/flights/${id}`, { method: "DELETE" });
		await get().fetchFlights(get().filters);
	},

	changeStatus: async (id: string, status: string) => {
		await api<SingleFlightApiResponse>(`/flights/${id}/status`, {
			method: "PATCH",
			body: JSON.stringify({ status }),
		});
		await get().fetchFlights(get().filters);
	},

	setFilters: (filters: FlightQueryParams) => set({ filters }),
	clearError: () => set({ error: null }),
}));
