import { Request, Response } from "express";
import * as service from "../services/auth.service";

export const registerUser = async (req: Request, res: Response) => {
	try {
		const result = await service.register(req.body);
		res.status(201).json(result);
	} catch (error) {
		console.error("REGISTER ERROR:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const result = await service.login(req.body);
	res.json(result);
};
