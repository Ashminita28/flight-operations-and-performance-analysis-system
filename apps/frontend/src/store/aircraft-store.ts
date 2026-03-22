import { create } from "zustand";
import type {
	Aircraft,
	CreateAircraftDto,
	UpdateAircraftDto,
} from "../types/aircraft-types";
import { aircraftService } from "@/services/aircraft-service";

interface AircraftState {
	aircraft: Aircraft[];
	loading: boolean;
	error: string | null;

	fetchAircraft: () => Promise<void>;
	createAircraft: (data: CreateAircraftDto) => Promise<void>;
	updateAircraft: (id: string, data: UpdateAircraftDto) => Promise<void>;
	deleteAircraft: (id: string) => Promise<void>;
}

let controller: AbortController | null = null;

export const useAircraftStore = create<AircraftState>(set => ({
	aircraft: [],
	loading: false,
	error: null,

	fetchAircraft: async () => {
		controller?.abort();
		controller = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await aircraftService.getAll(controller.signal);
			set({ aircraft: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	createAircraft: async data => {
		set({ loading: true, error: null });

		try {
			await aircraftService.create(data);
			const updated = await aircraftService.getAll();
			set({ aircraft: updated });
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	updateAircraft: async (id, data) => {
		set({ loading: true, error: null });

		try {
			await aircraftService.update(id, data);
			const updated = await aircraftService.getAll();
			set({ aircraft: updated });
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},

	deleteAircraft: async id => {
		set({ loading: true, error: null });

		try {
			await aircraftService.delete(id);
			const updated = await aircraftService.getAll();
			set({ aircraft: updated });
		} catch (err) {
			if (err instanceof Error) {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},
}));
