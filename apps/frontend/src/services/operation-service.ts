import { api, type ApiResponse } from "@/api/api";
import type { OperationalEvent } from "@/types/types";

export const operationService = {
	getEvents: async (flightId: string, signal?: AbortSignal) => {
		const res = await api<ApiResponse<OperationalEvent[]>>(
			`/operations/${flightId}/events`,
			{ signal },
		);

		if (!res.data) throw new Error("Invalid events response");

		return res.data;
	},

	createEvent: async (flightId: string, payload: unknown) => {
		await api(`/operations/${flightId}/events`, {
			method: "POST",
			body: JSON.stringify(payload),
		});
	},
};
