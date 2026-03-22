import { api, type ApiResponse } from "@/api/api";
import type { Performance } from "@/types/flight-types";

export const performanceService = {
	get: async (flightId: string, signal?: AbortSignal) => {
		const res = await api<ApiResponse<Performance>>(
			`/performance/${flightId}`,
			{ signal },
		);

		if (!res.data) throw new Error("Invalid performance response");

		return res.data;
	},

	create: async (flightId: string, payload: unknown) => {
		await api(`/performance/${flightId}`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
	},
	getAllPerformance: async (signal?: AbortSignal): Promise<Performance[]> => {
		const res = await api<ApiResponse<Performance[]>>("/performance/", {
			signal,
		});

		if (!res.data) {
			throw new Error("Invalid aircraft list response");
		}

		return res.data;
	},
};
