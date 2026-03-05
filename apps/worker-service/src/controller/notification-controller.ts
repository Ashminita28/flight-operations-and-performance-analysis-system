import { Request, Response } from "express";
import * as notificationService from "../services/notification-service";

export async function getNotifications(req: Request, res: Response) {
	const notifications = await notificationService.getAllNotifications();
	res.json(notifications);
}

export async function markNotificationRead(req: Request, res: Response) {
	const { id } = req.params;
	await notificationService.markAsRead(id as string);
	res.json({ success: true });
}
