import { api, type ApiResponse } from "@/api/api";

export interface Notification {
	id: string;
	flight_id: string;
	title: string;
	message: string;
	type: string;
	is_read: boolean;
}

export const notificationService = {
	getAll: async (signal?: AbortSignal) => {
		const res = await api<ApiResponse<Notification[]>>("/notifications", {
			signal,
		});

		if (!res.data) throw new Error("Invalid notifications response");

		return res.data;
	},
};
