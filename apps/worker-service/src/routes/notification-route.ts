import { Router } from "express";
import {
	getNotifications,
	markNotificationRead,
} from "../controller/notification-controller";
import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";

const notificationRouter: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification endpoints
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: List notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications array
 */
notificationRouter.get(
	"/notifications",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getNotifications,
);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked
 */
notificationRouter.patch(
	"/notifications/:id/read",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	markNotificationRead,
);

export default notificationRouter;
