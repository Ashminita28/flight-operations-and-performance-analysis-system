import { Request, Response } from "express";
import Send from "../validations/response";
import { findAllUsers } from "../repositories/auth-repository";

export const adminController = async (req: Request, res: Response) => {
	try {
		const users = await findAllUsers();
		return Send.success(res, users, "All registered users");
	} catch (error) {
		console.error(error);
		return Send.error(
			res,
			500,
			"Could not perform operation at this time, kindly try again later.",
		);
	}
};
