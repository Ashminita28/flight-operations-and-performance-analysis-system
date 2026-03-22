import { Router } from "express";
import {
	getNotifications,
	markNotificationRead,
} from "../controller/notification-controller";
import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";

const notificationRouter: Router = Router();

notificationRouter.get(
	"/notifications",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getNotifications,
);

notificationRouter.patch(
	"/notifications/:id/read",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	markNotificationRead,
);

export default notificationRouter;
