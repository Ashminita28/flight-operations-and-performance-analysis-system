import { Request, Response, NextFunction } from "express";
import { User } from "../models/connection-models";
import { Role } from "../models/connection-models";
import Send from "../utils/response-utils";

interface AuthRequest extends Request {
	user?: any;
}

export const checkRole =
	(roleName: string) =>
	async (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			const user = await User.findByPk(req.user.userId, {
				include: [{ model: Role, attributes: ["name"] }],
			});

			if (!user) {
				return Send.unauthorized(res, null, "User not found");
			}

			const roles = user.toJSON().Roles?.map((r: any) => r.name) || [];

			if (!roles.includes(roleName)) {
				return Send.forbidden(res, null, "Access denied");
			}

			next();
		} catch (error) {
			return Send.error(res, null, "Role check failed");
		}
	};
