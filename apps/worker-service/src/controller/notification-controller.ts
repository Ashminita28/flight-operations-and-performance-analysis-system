import { NextFunction, Request, Response } from "express";
import { notificationService } from "../services/notification-service";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";

export async function getNotifications(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const notifications = await notificationService.getAllNotifications();
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
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

		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.NOTIFICATION_MARKED_READ,
		});
	} catch (error) {
		next(error);
	}
}
