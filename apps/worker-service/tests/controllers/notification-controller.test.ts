import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import * as notificationController from "../../src/controller/notification-controller";
import { notificationService } from "../../src/services/notification-service";

vi.mock("../../src/services/notification-service");

describe("Notification Controller", () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: NextFunction;

	beforeEach(() => {
		req = {
			body: {},
			params: {},
			query: {},
		};
		res = {
			status: vi.fn().mockReturnThis(),
			json: vi.fn().mockReturnThis(),
		};
		next = vi.fn();
		vi.clearAllMocks();
	});

	describe("getNotifications", () => {
		it("should get all notifications successfully", async () => {
			const mockNotifications = [
				{
					id: "1",
					title: "Flight Delayed",
					message: "Flight FL001 is delayed by 30 minutes",
					is_read: false,
					createdAt: "2025-03-12T10:00:00Z",
				},
				{
					id: "2",
					title: "Flight Cancelled",
					message: "Flight FL002 is cancelled",
					is_read: true,
					createdAt: "2025-03-12T09:00:00Z",
				},
			];

			(notificationService.getAllNotifications as any).mockResolvedValue(
				mockNotifications,
			);

			await notificationController.getNotifications(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockNotifications,
			});
		});

		it("should return empty array when no notifications exist", async () => {
			(notificationService.getAllNotifications as any).mockResolvedValue([]);

			await notificationController.getNotifications(
				req as Request,
				res as Response,
				next,
			);

			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: [],
			});
		});

		it("should handle error when fetching notifications", async () => {
			const error = new Error("Database error");

			(notificationService.getAllNotifications as any).mockRejectedValue(error);

			await notificationController.getNotifications(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("markNotificationRead", () => {
		it("should mark notification as read successfully", async () => {
			req.params = { id: "1" };

			(notificationService.markAsRead as any).mockResolvedValue([1]);

			await notificationController.markNotificationRead(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				message: "Notification marked as read",
			});
			expect(notificationService.markAsRead).toHaveBeenCalledWith("1");
		});

		it("should handle error when marking notification as read", async () => {
			req.params = { id: "invalid-id" };
			const error = new Error("Notification not found");

			(notificationService.markAsRead as any).mockRejectedValue(error);

			await notificationController.markNotificationRead(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});
});
