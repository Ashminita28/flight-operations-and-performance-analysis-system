import { create } from "zustand";
import {
	notificationService,
	type Notification,
} from "@/services/notification-service";

interface State {
	notifications: Notification[];
	loading: boolean;
	error: string | null;

	fetchNotifications: () => Promise<void>;
}

let controller: AbortController | null = null;

export const useNotificationStore = create<State>(set => ({
	notifications: [],
	loading: false,
	error: null,

	fetchNotifications: async () => {
		controller?.abort();
		controller = new AbortController();

		set({ loading: true, error: null });

		try {
			const data = await notificationService.getAll(controller.signal);
			set({ notifications: data });
		} catch (err) {
			if (err instanceof Error && err.name !== "AbortError") {
				set({ error: err.message });
			}
		} finally {
			set({ loading: false });
		}
	},
}));
