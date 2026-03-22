import { handleApiError } from "./error-handler";
const API_BASE = "/api";

export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data?: T;
	pagination?: {
		total: number;
		page: number;
		limit: number;
		total_pages: number;
	};
	error?: string;
}

export async function api<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const controller = options.signal ? null : new AbortController();

	const res = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		signal: options.signal ?? controller?.signal,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(options.headers ?? {}),
		},
	});

	if (!res.ok) {
		await handleApiError(res);
	}

	return res.json() as Promise<T>;
}

/**
 * Helper to create AbortController per request (optional usage)
 */
export function createRequestController(): AbortController {
	return new AbortController();
}
