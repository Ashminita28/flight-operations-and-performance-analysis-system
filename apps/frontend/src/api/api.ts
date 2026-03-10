const API_BASE = "/api";

export async function api<T = any>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const res = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
	});
	let data;
	try {
		data = await res.json();
	} catch {
		throw new Error("Server did not return json");
	}
	if (!res.ok) {
		console.log("Backend error:", data);
		throw new Error(data.message || "Request failed");
	}

	return data;
}
