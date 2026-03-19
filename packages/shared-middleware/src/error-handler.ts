import { Request, Response, NextFunction } from "express";
import { ApiError, HTTP_STATUS } from "@package/shared-utils";
import { sendResponse } from "@package/shared-utils";
import { ZodError } from "zod";

export const errorHandler = (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let statusCode = 500;
	let message = "Internal server error";

	if (err instanceof ApiError) {
		statusCode = err.statusCode;
		message = err.message;
	}

	if (err instanceof ZodError) {
		const messages = err.issues.map(e => e.message).join(", ");

		return sendResponse({
			res,
			statusCode: HTTP_STATUS.BAD_REQUEST,
			success: false,
			message: messages,
		});
	}

	if (err instanceof Error) {
		message = err.message;
	}

	sendResponse({
		res,
		statusCode,
		success: false,
		message,
	});
};
