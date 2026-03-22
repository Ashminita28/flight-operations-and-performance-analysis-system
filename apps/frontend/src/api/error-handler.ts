export class ApiException extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

export async function handleApiError(res: Response): Promise<never> {
	let message = "Something went wrong";

	try {
		const data = (await res.json()) as { message?: string };
		if (data?.message) {
			message = data.message;
		}
	} catch {
		// ignore JSON parsing errors
	}

	throw new ApiException(res.status, message);
}
