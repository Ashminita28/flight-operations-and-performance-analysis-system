import { create } from "zustand";
import { api } from "@/api/api";

export interface Aircraft {
	id: string;
	registration: string;
	manufacturer: string;
	model: string;
	status: string;
}

interface AircraftState {
	aircraft: Aircraft[];
	loading: boolean;
	fetchAircraft: () => Promise<void>;
	createAircraft: (data: any) => Promise<void>;
	updateAircraft: (id: string, data: any) => Promise<void>;
	deleteAircraft: (id: string) => Promise<void>;
}

export const useAircraftStore = create<AircraftState>(set => ({
	aircraft: [],
	loading: false,

	fetchAircraft: async () => {
		try {
			set({ loading: true });

			const res = await api<{ success: boolean; data: Aircraft[] }>(
				"/aircraft/",
			);

			set({ aircraft: res.data });
		} finally {
			set({ loading: false });
		}
	},

	createAircraft: async data => {
		await api("/aircraft/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		await useAircraftStore.getState().fetchAircraft();
	},

	updateAircraft: async (id, data) => {
		await api(`/aircraft/${id}/`, {
			method: "PUT",
			body: JSON.stringify(data),
		});

		await useAircraftStore.getState().fetchAircraft();
	},

	deleteAircraft: async id => {
		await api(`/aircraft/${id}/`, {
			method: "DELETE",
		});

		await useAircraftStore.getState().fetchAircraft();
	},
}));
