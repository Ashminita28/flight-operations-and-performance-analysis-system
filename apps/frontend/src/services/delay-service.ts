import { api, type ApiResponse } from "@/api/api";
import type { DelayCategory } from "@/types/flight-types";

export const delayService = {
	getAll: async (signal?: AbortSignal): Promise<DelayCategory[]> => {
		const res = await api<ApiResponse<DelayCategory[]>>("/delays", { signal });

		if (!res.data) throw new Error("Invalid delay categories response");

		return res.data;
	},

	create: async (payload: {
		code: string;
		name: string;
	}): Promise<DelayCategory> => {
		const res = await api<ApiResponse<DelayCategory>>("/delays", {
			method: "POST",
			body: JSON.stringify(payload),
		});

		if (!res.data) throw new Error("Invalid create delay response");

		return res.data;
	},

	delete: async (id: string): Promise<void> => {
		await api<ApiResponse<null>>(`/delays/${id}`, {
			method: "DELETE",
		});
	},
};
