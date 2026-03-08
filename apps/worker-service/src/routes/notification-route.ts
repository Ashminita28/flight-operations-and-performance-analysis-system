import { Router } from "express";
import {
	getNotifications,
	markNotificationRead,
} from "../controller/notification-controller";
import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";

const router: Router = Router();

router.get(
	"/notifications",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	getNotifications,
);
router.patch(
	"/notifications/:id/read",
	authenticate,
	authorizeRole("Manager", "Operations", "Analyst", "Admin"),
	markNotificationRead,
);

export default router;
