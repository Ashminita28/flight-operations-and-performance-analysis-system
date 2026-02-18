import { Request, Response } from "express";
import User from "../models/user";
import Send from "../utils/response-utils";
import { findAllUsers } from "../repositories/auth-repository";

// export const adminController = {
//   async users(req: Request, res: Response): Promise<Response> {
//     try {
//       const users = await findAllUsers();

//       return Send.success(
//         res,
//         users,
//         "All registered users"
//       );
//     } catch (error) {
//       console.error(error);
//       return Send.error(
//         res,
//         500,
//         "Could not perform operation at this time, kindly try again later.",
//       );
//     }
//   }
// };

// export default adminController;

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
