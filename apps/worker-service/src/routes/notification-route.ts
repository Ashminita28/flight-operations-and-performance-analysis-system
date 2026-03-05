import { Router } from "express";
import {
	getNotifications,
	markNotificationRead,
} from "../controller/notification-controller";

const router: Router = Router();

router.get("/", getNotifications);
router.patch("/:id/read", markNotificationRead);

export default router;
