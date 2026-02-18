import { Request, Response, NextFunction } from "express";
import Send from "../utils/response-utils";
import Role from "../models/role";
import Permission from "../models/permission";
import User from "../models/user";

interface AuthRequest extends Request {
	user?: any;
}

const checkPermission =
	(permissionName: string) =>
	async (req: AuthRequest, res: Response, next: NextFunction) => {
		try {
			const user = await User.findByPk(req.user.userId, {
				include: [
					{
						model: Role,
						as: "roles",
						include: [
							{
								model: Permission,
								as: "permisions",
							},
						],
					},
				],
			});

			console.log("TUMMM:", user);

			if (!user) {
				return Send.unauthorized(res, null, "User not found");
			}

			const permissions =
				(user as any).Roles?.flatMap((r: any) =>
					r.Permissions.map((p: any) => p.name),
				) || [];

			if (!permissions.includes(permissionName)) {
				return Send.forbidden(res, null, "Not authorized");
			}

			next();
		} catch (error) {
			console.error(error);
			return Send.error(res, null, "Internal server error");
		}
	};

export default checkPermission;
