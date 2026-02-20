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
		name: string,
		email: string,
		phone: string,
		password: string,
	) => Promise<void>;
	logout: () => Promise<void>;
	fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
	user: null,
	loading: false,

	login: async (email, password) => {
		set({ loading: true });
		const res = await api("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
		set({ user: res.data, loading: false });
	},

	register: async (name, email, phone, password) => {
		set({ loading: true });
		await api("/auth/register", {
			method: "POST",
			body: JSON.stringify({ name, email, phone, password }),
		});
		set({ loading: false });
	},

	logout: async () => {
		await api("/auth/logout", { method: "POST" });
		set({ user: null });
	},

	fetchUser: async () => {
		try {
			const res = await api("/profile");
			set({ user: res.data });
		} catch {
			set({ user: null });
		}
	},
}));
