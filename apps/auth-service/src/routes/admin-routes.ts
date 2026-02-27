import { Router } from "express";
import { adminController } from "../controllers/admin-controller";
import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";

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
	authorizeRole(["Admin"]),
	adminController,
);

export default adminRouter;
