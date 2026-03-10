import { api } from "@/api/api";
import { create } from "zustand";

type Notification = {
	id: string;
	flight_id: string;
	title: string;
	message: string;
	type: string;
	is_read: boolean;
};

type NotificationStore = {
	notifications: Notification[];
	fetchNotifications: () => Promise<void>;
};

export const useNotificationStore = create<NotificationStore>(set => ({
	notifications: [],

	fetchNotifications: async () => {
		try {
			const res = await api<{ success: boolean; data: Notification[] }>(
				"/notifications",
			);

			set({ notifications: res.data });
		} catch (error) {
			console.error("Notification fetch failed", error);
		}
	},
}));
