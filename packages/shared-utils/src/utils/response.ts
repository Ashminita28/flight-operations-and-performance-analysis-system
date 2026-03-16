import { ApiResponse, ResponseOptions } from "../types/response-type";
export const sendResponse = <T = unknown>({
	res,
	statusCode = 200,
	success,
	message = "Success",
	data,
	pagination,
	error,
}: ResponseOptions<T>): void => {
	const response: ApiResponse<T> = {
		success,
		message,
	};

	if (data !== undefined) {
		response.data = data;
	}
	if (pagination) {
		response.pagination = pagination;
	}
	if (error) {
		response.error = error;
	}
	res.status(statusCode).json(response);
};
