import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService, type User } from "@/services/auth-service";
import type { RegisterPayload } from "../types/auth-types";
import { ApiException } from "@/api/error-handler";

interface State {
	user: User | null;
	loading: boolean;
	isFetched: boolean;
	error: string | null;

	login: (email: string, password: string) => Promise<User>;
	register: (payload: RegisterPayload) => Promise<void>;
	logout: () => Promise<void>;
	initializeAuth: () => Promise<void>;
}

let controller: AbortController | null = null;

export const useAuthStore = create<State>()(
	persist(
		set => ({
			user: null,
			loading: false,
			isFetched: false,
			error: null,

			login: async (email, password) => {
				set({ loading: true, error: null });

				try {
					const user = await authService.login(email, password);
					set({ user, isFetched: true });
					return user;
				} catch (err) {
					if (err instanceof Error) set({ error: err.message });
					throw err;
				} finally {
					set({ loading: false });
				}
			},

			register: async payload => {
				set({ loading: true, error: null });

				try {
					await authService.register(payload);
				} catch (err) {
					if (err instanceof Error) set({ error: err.message });
					throw err;
				} finally {
					set({ loading: false });
				}
			},

			logout: async () => {
				await authService.logout();
				set({ user: null, isFetched: true });
			},

			initializeAuth: async () => {
				controller?.abort();
				controller = new AbortController();

				set({ loading: true });

				try {
					const user = await authService.getProfile(controller.signal);
					set({ user, isFetched: true });
				} catch (err: unknown) {
					if (err instanceof ApiException) {
						console.error(
							{ message: err.message, status: err.status },
							"Auth initialization failed",
						);
					} else if (err instanceof Error) {
						console.error({ message: err.message }, "Unknown error");
					} else {
						console.error({ err }, "Unexpected error");
					}

					set({ user: null, isFetched: true });
				} finally {
					set({ loading: false });
				}
			},
		}),
		{
			name: "auth-storage",
		},
	),
);
