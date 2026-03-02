import { create } from "zustand";
import { api } from "@/api/api";

export interface Flight {
	id: string;
	flight_number: string;
	origin_airport: string;
	destination_airport: string;
	status: string;
	aircraft_id: string;
	scheduled_departure: string;
	scheduled_arrival: string;
}

interface FlightState {
	flights: Flight[];
	loading: boolean;
	fetchFlights: () => Promise<void>;
	fetchTodayFlights: () => Promise<void>;
	searchFlights: (flightNumber: string) => Promise<void>;
	createFlight: (data: any) => Promise<void>;
	updateFlight: (id: string, data: any) => Promise<void>;
	deleteFlight: (id: string) => Promise<void>;
	changeStatus: (id: string, status: string) => Promise<void>;
}

export const useFlightStore = create<FlightState>(set => ({
	flights: [],
	loading: false,

	fetchFlights: async () => {
		try {
			set({ loading: true });

			const res = await api<{ success: boolean; data: Flight[] }>("/flights/");

			set({ flights: res.data });
		} finally {
			set({ loading: false });
		}
	},

	fetchTodayFlights: async () => {
		const res = await api<{ success: boolean; data: Flight[] }>(
			"/flights/today/",
		);

		set({ flights: res.data });
	},

	searchFlights: async flightNumber => {
		const res = await api<{ success: boolean; data: Flight[] }>(
			`/flights/search/?flight_number=${flightNumber}`,
		);

		set({ flights: res.data });
	},

	createFlight: async data => {
		await api("/flights/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		await useFlightStore.getState().fetchFlights();
	},

	updateFlight: async (id, data) => {
		await api(`/flights/${id}/`, {
			method: "PUT",
			body: JSON.stringify(data),
		});

		await useFlightStore.getState().fetchFlights();
	},

	deleteFlight: async id => {
		await api(`/flights/${id}/`, {
			method: "DELETE",
		});

		await useFlightStore.getState().fetchFlights();
	},

	changeStatus: async (id, status) => {
		await api(`/flights/${id}/status/`, {
			method: "PATCH",
			body: JSON.stringify({ status }),
		});

		await useFlightStore.getState().fetchFlights();
	},
}));
