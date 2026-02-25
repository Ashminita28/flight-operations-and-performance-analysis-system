import { Request, Response, NextFunction } from "express";
import Send from "../utils/response-utils";
// import Role from "../models/role";
// import Permission from "../models/permission";
import { User } from "../models/connection-models";

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
						association: "Roles",
						include: [
							{
								association: "Permissions",
							},
						],
					},
				],
			});

			console.log("TUMMM:", user);

			if (!user) {
				return Send.unauthorized(res, null, "User not found");
			}

			console.log("USER:", user?.toJSON());
			console.log("FULL USER:", JSON.stringify(user, null, 2));

			const plainUser = user?.toJSON();
			const permissions =
				plainUser?.Roles?.flatMap((r: any) =>
					r.Permissions?.map((p: any) => p.name),
				) || [];

			console.log("USER PERMISSION:", permissions);
			console.log("REQUIRED PERMISSION:", permissionName);

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
