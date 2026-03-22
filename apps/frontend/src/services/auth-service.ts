import { api, type ApiResponse } from "@/api/api";
import type { RegisterPayload } from "../types/auth-types";

export interface User {
	id: string;
	name: string;
	email: string;
	phone?: number;
	roles?: string[];
}

export const authService = {
	login: async (email: string, password: string) => {
		const res = await api<ApiResponse<User>>("/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
		});
		if (!res.success) {
			throw new Error(res.message || "Login Failed");
		}
		if (!res.data) throw new Error("Invalid login response");

		return res.data;
	},

	register: async (payload: RegisterPayload) => {
		await api<ApiResponse<null>>("/auth/register", {
			method: "POST",
			body: JSON.stringify(payload),
		});
	},

	logout: async () => {
		await api("/auth/logout", { method: "POST" });
	},

	getProfile: async (signal?: AbortSignal) => {
		const res = await api<ApiResponse<User>>("/user/profile", { signal });

		if (!res.data) throw new Error("Invalid profile response");

		return res.data;
	},
};
