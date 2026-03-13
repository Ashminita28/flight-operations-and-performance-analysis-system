import { create } from "zustand";
import { api } from "../api/api";

interface User {
	id: string;
	name: string;
	email: string;
	roles?: string[];
}

interface AuthState {
	user: User | null;

	loading: boolean;
	isFetched: boolean;

	login: (email: string, password: string) => Promise<void>;

	register: (
		first_name: string,
		last_name: string,
		email: string,
		phone: string,
		password: string,
		roleName: string,
	) => Promise<void>;

	logout: () => Promise<void>;

	fetchUser: () => Promise<void>;
	fetchtAllUsers: () => Promise<void>;
	initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,

	loading: false,
	isFetched: false,

	// LOGIN
	login: async (email, password) => {
		set({ loading: true });

		const res = await api("/auth/login", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
		});
		set({
			user: res.data,
			loading: false,
			isFetched: true,
		});
	},

	// REGISTER (ADMIN ONLY)
	register: async (first_name, last_name, email, phone, password, roleName) => {
		set({ loading: true });

		await api("/auth/register", {
			method: "POST",

			body: JSON.stringify({
				first_name,
				last_name,
				email,
				phone,
				password,
				roleName,
			}),
		});

		set({ loading: false });
	},

	// LOGOUT

	logout: async () => {
		await api("/auth/logout", {
			method: "POST",
		});

		set({
			user: null,
			isFetched: true,
		});
	},

	// FETCH USER FROM COOKIE TOKEN
	fetchUser: async () => {
		set({ loading: true });
		try {
			const res = await api("/profile");
			set({ user: res.data, isFetched: true });
		} catch {
			set({ user: null, isFetched: true });
		} finally {
			set({ loading: false });
		}
	},

	initializeAuth: async () => {
		set({ loading: true });
		try {
			const res = await api("/profile");
			set({ user: res.data, isFetched: true });
		} catch (error) {
			// User is not authenticated, that's fine
			set({ user: null, isFetched: true });
		} finally {
			set({ loading: false });
		}
	},

	fetchtAllUsers: async () => {
		set({ loading: true });
		try {
			const res = await api("/users");
			set({ user: res.data });
		} catch {
			set({ user: null });
		} finally {
			set({ loading: false });
		}
	},
}));
