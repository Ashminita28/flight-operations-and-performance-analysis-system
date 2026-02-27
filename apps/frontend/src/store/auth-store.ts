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
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,

	loading: false,

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

		// Backend returns Send.success format
		set({
			user: res.data,
			loading: false,
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
		});
	},

	// FETCH USER FROM COOKIE TOKEN

	fetchUser: async () => {
		try {
			const res = await api("/user/profile");

			set({
				user: res.data,
			});
		} catch {
			set({
				user: null,
			});
		}
	},
}));
