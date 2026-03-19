import { api } from "@/api/api";
import type {
	FlightsApiResponse,
	FlightListApiResponse,
	SingleFlightApiResponse,
	AircraftApiResponse,
	FlightQueryParams,
} from "@/types/types";

function buildQuery(params: FlightQueryParams): string {
	const query = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null && value !== "") {
			query.set(key, String(value));
		}
	});

	return query.toString();
}

export const flightService = {
	getAll: async (
		params: FlightQueryParams,
		signal?: AbortSignal,
	): Promise<FlightsApiResponse> => {
		const qs = buildQuery(params);

		return api<FlightsApiResponse>(`/flights?${qs}`, {
			signal,
		});
	},

	getById: async (id: string, signal?: AbortSignal) => {
		const res = await api<SingleFlightApiResponse>(`/flights/${id}`, {
			signal,
		});

		if (!res?.data) throw new Error("Invalid flight response");

		return res.data;
	},

	getToday: async (signal?: AbortSignal) => {
		const res = await api<FlightListApiResponse>("/flights/today", {
			signal,
		});

		return res.data ?? [];
	},

	search: async (flightNumber: string, signal?: AbortSignal) => {
		const res = await api<FlightListApiResponse>(
			`/flights/search?flight_number=${encodeURIComponent(flightNumber)}`,
			{ signal },
		);

		return res.data ?? [];
	},

	getAircraftMap: async (signal?: AbortSignal) => {
		const res = await api<AircraftApiResponse>("/aircraft/", { signal });

		const map: Record<string, string> = {};

		(res.data ?? []).forEach(a => {
			map[a.id] = `${a.registration} – ${a.model}`;
		});

		return map;
	},

	create: async (data: unknown) => {
		await api("/flights/", {
			method: "POST",
			body: JSON.stringify(data),
		});
	},

	update: async (id: string, data: unknown) => {
		await api(`/flights/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	},

	delete: async (id: string) => {
		await api(`/flights/${id}`, { method: "DELETE" });
	},

	changeStatus: async (id: string, status: string) => {
		await api(`/flights/${id}/status`, {
			method: "PATCH",
			body: JSON.stringify({ status }),
		});
	},
};
