import { api } from "@/api/api";
import type { ApiResponse } from "@/api/api";
import type {
	Aircraft,
	AircraftListResponse,
	CreateAircraftDto,
	UpdateAircraftDto,
} from "@/types/aircraft";

export const aircraftService = {
	getAll: async (signal?: AbortSignal): Promise<Aircraft[]> => {
		const res = await api<ApiResponse<AircraftListResponse>>("/aircraft/", {
			signal,
		});

		if (!res.data) {
			throw new Error("Invalid aircraft list response");
		}

		return res.data.rows;
	},

	create: async (data: CreateAircraftDto): Promise<Aircraft> => {
		const res = await api<ApiResponse<Aircraft>>("/aircraft/", {
			method: "POST",
			body: JSON.stringify(data),
		});

		if (!res.data) {
			throw new Error("Invalid aircraft create response");
		}

		return res.data;
	},

	update: async (id: string, data: UpdateAircraftDto): Promise<Aircraft> => {
		const res = await api<ApiResponse<Aircraft>>(`/aircraft/${id}/`, {
			method: "PUT",
			body: JSON.stringify(data),
		});

		if (!res.data) {
			throw new Error("Invalid aircraft update response");
		}

		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await api<ApiResponse<null>>(`/aircraft/${id}/`, {
			method: "DELETE",
		});
	},
};
