import { Response } from "express";

class Send {
	static success(res: Response, data: any, message = "success"): Response {
		return res.status(200).json({
			ok: true,
			message,
			data,
		});
	}

	static error(res: Response, data: any, message = "error"): Response {
		return res.status(500).json({
			ok: false,
			message,
			data,
		});
	}

	static notFound(res: Response, data: any, message = "not found"): Response {
		return res.status(404).json({
			ok: false,
			message,
			data,
		});
	}

	static unauthorized(
		res: Response,
		data: any,
		message = "unauthorized",
	): Response {
		return res.status(401).json({
			ok: false,
			message,
			data,
		});
	}

	static validationErrors(
		res: Response,
		errors: Record<string, string[]>,
	): Response {
		return res.status(422).json({
			ok: false,
			message: "Validation error",
			errors,
		});
	}

	static forbidden(res: Response, data: any, message = "forbiden"): Response {
		return res.status(403).json({
			ok: false,
			message,
			data,
		});
	}

	static badRequest(
		res: Response,
		data: any,
		message = "bad request",
	): Response {
		return res.status(400).json({
			ok: false,
			message,
			data,
		});
	}
}

export default Send;
