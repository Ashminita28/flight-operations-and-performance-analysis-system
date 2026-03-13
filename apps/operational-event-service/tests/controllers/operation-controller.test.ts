import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response, NextFunction } from "express";
import { OperationController } from "../../src/controllers/operation-controller";
import { operationService } from "../../src/services/operation-service";

vi.mock("../../src/services/operation-service");

describe("Operation Controller", () => {
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

	describe("recordFlightEvent", () => {
		it("should record operational event successfully", async () => {
			const mockEvent = {
				id: "1",
				flight_id: "1",
				event_type: "delayed",
				severity: "high",
			};

			req.params = { flightId: "1" };
			req.body = {
				event_type: "delayed",
				delay_category_id: "1",
				delay_minutes: 30,
				description: "Weather delay",
				event_time: "2025-03-12T10:00:00Z",
				severity: "high",
			};

			(operationService.createOperationalEvent as any).mockResolvedValue(
				mockEvent,
			);

			await OperationController.recordFlightEvent(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				message: "Operational event recorded successfully",
				data: mockEvent,
			});
		});

		it("should handle validation error when recording event", async () => {
			req.params = { flightId: "1" };
			req.body = { event_type: "delayed" };

			const error = new Error("Validation failed");
			(operationService.createOperationalEvent as any).mockRejectedValue(error);

			await OperationController.recordFlightEvent(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("changeFlightEvent", () => {
		it("should update flight event successfully", async () => {
			const mockEvent = {
				id: "1",
				flight_id: "1",
				event_type: "delayed",
				delay_minutes: 45,
			};

			req.params = { flightId: "1", id: "1" };
			req.body = { delay_minutes: 45 };

			(operationService.updateEvent as any).mockResolvedValue(mockEvent);

			await OperationController.changeFlightEvent(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockEvent,
			});
		});

		it("should handle error when updating event", async () => {
			req.params = { flightId: "1", id: "1" };
			req.body = { delay_minutes: 45 };

			const error = new Error("Event not found");
			(operationService.updateEvent as any).mockRejectedValue(error);

			await OperationController.changeFlightEvent(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getByFlight", () => {
		it("should get events by flight successfully", async () => {
			const mockEvents = [
				{ id: "1", flight_id: "1", event_type: "delayed" },
				{ id: "2", flight_id: "1", event_type: "cancelled" },
			];

			req.params = { flight_id: "1" };

			(operationService.getEventsByFlight as any).mockResolvedValue(mockEvents);

			await OperationController.getByFlight(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockEvents,
			});
		});

		it("should handle error when flight not found", async () => {
			req.params = { flight_id: "invalid-id" };

			const error = new Error("Flight not found");
			(operationService.getEventsByFlight as any).mockRejectedValue(error);

			await OperationController.getByFlight(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe("getAllEvents", () => {
		it("should get all events successfully", async () => {
			const mockEvents = [
				{ id: "1", flight_id: "1", event_type: "delayed" },
				{ id: "2", flight_id: "2", event_type: "cancelled" },
			];

			(operationService.getAllFlightEvents as any).mockResolvedValue(
				mockEvents,
			);

			await OperationController.getAllEvents(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: mockEvents,
			});
		});

		it("should return empty array when no events exist", async () => {
			(operationService.getAllFlightEvents as any).mockResolvedValue([]);

			await OperationController.getAllEvents(
				req as Request,
				res as Response,
				next,
			);

			expect(res.json).toHaveBeenCalledWith({
				success: true,
				data: [],
			});
		});

		it("should handle error when fetching all events", async () => {
			const error = new Error("Database error");
			(operationService.getAllFlightEvents as any).mockRejectedValue(error);

			await OperationController.getAllEvents(
				req as Request,
				res as Response,
				next,
			);

			expect(next).toHaveBeenCalledWith(error);
		});
	});
});
