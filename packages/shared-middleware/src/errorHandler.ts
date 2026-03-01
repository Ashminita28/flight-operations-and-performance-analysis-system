import { Request, Response, NextFunction } from "express";

export const errorHandler = (
	req: Request,
	res: Response,
	next: NextFunction,
	err: any,
) => {
	console.error(err);

	res.status(err.status || 500).json({
		success: false,
		message: err.message || "Internal server error",
	});
};
