import { NextFunction, Request, Response } from "express";
import { notificationService } from "../services/notification-service";

export async function getNotifications(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const notifications = await notificationService.getAllNotifications();

		return res.status(200).json({
			success: true,
			data: notifications,
		});
	} catch (error) {
		next(error);
	}
}

export async function markNotificationRead(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const { id } = req.params;

		await notificationService.markAsRead(id as string);

		return res.status(200).json({
			success: true,
			message: "Notification marked as read",
		});
	} catch (error) {
		next(error);
	}
}
