import { create } from "zustand";
import { api } from "@/api/api";
import type { Flight } from "@/types/flight-types";

interface FlightState {
	flights: Flight[];
	selectedFlight: Flight | null;
	loading: boolean;
	fetchFlights: () => Promise<void>;
	fetchFlightById: (id: string) => Promise<void>;
	fetchTodayFlights: () => Promise<void>;
	searchFlights: (flightNumber: string) => Promise<void>;
	createFlight: (data: any) => Promise<void>;
	updateFlight: (id: string, data: any) => Promise<void>;
	deleteFlight: (id: string) => Promise<void>;
	changeStatus: (id: string, status: string) => Promise<void>;
}

export const useFlightStore = create<FlightState>(set => ({
	flights: [],
	selectedFlight: null,
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

	fetchFlightById: async id => {
		set({ loading: true });
		try {
			const res = await api<{ success: boolean; data: Flight }>(
				`/flights/${id}`,
			);
			set({ selectedFlight: res.data });
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
