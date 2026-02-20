import { Router } from "express";
import constants from "../utils/constants";
import { adminController } from "../controllers/admin-controller";
import checkPermission from "../middlewares/role-middleware";
import { authenticate } from "../middlewares/auth-middleware";
import Send from "../utils/response-utils";

const adminRouter: Router = Router();

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of users
 */

adminRouter.get(
	"/users",
	authenticate,
	checkPermission(constants.PERMISSION_VIEW_ALL_USERS),
	adminController,
);

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Access admin dashboard
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin dashboard data
 */

adminRouter.get(
	"/dashboard",
	authenticate,
	checkPermission(constants.PERMISSION_VIEW_ADMIN_DASHBOARD),
	(req, res) => {
		return Send.success(res, "", "Admin dashboard access allowed.");
	},
);

export default adminRouter;
