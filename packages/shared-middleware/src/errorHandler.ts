import { Request, Response, NextFunction } from "express";
import { ApiError } from "@package/shared-utils";
import { ZodError } from "zod";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err);
	let statusCode = err.statusCode || 500;
	let message = err.message || "Internal server error";

	if (err instanceof ApiError) {
		statusCode = err.statusCode;
		message = err.message;
	}
	if (err instanceof ZodError) {
		const messages = err.issues.map(e => e.message).join(", ");
		return res.status(400).json({
			success: false,
			message: messages,
		});
	}
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
};
