import { Request, Response, NextFunction } from "express";
import { ApiError } from "@package/shared-utils";

export const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err);
	let statusCode = 500;
	let message = "Internal server error";

	if (err instanceof ApiError) {
		statusCode = err.statusCode;
		message = err.message;
	}
	if (err.name == "ZodError") {
		res.status(400).json({
			success: false,
			message: err.errors.map((e: any) => e.message).join(","),
		});
	}
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	});
};
