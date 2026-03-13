import { describe, it, expect, vi, beforeEach } from "vitest";
import { operationService } from "../../src/services/operation-service";
import * as repo from "../../src/repositories/operation-repository";
import { OperationalEvent } from "@package/shared-database";

vi.mock("../../src/repositories/operation-repository");
vi.mock("../../src/services/rabbitmq-publisher");
vi.mock("@package/shared-database");

describe("Operation Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("createOperationalEvent", () => {
		it("should create operational event successfully", async () => {
			const mockFlight = {
				id: "1",
				flight_number: "FL001",
				status: "scheduled",
			};
			const mockEvent = {
				id: "1",
				flight_id: "1",
				event_type: "delayed",
				severity: "high",
			};

			const eventData = {
				flight_id: "1",
				event_type: "delayed",
				delay_category_id: "1",
				delay_minutes: 30,
				description: "Weather delay",
				event_time: "2025-03-12T10:00:00Z",
				severity: "high",
			};

			(repo.findFlightById as any).mockResolvedValue(mockFlight);
			(repo.create as any).mockResolvedValue(mockEvent);

			const result = await operationService.createOperationalEvent(eventData);

			expect(result).toEqual(mockEvent);
			expect(repo.create).toHaveBeenCalledWith(eventData);
		});

		it("should throw error when flight not found", async () => {
			const eventData = {
				flight_id: "invalid-id",
				event_type: "delayed",
				severity: "high",
			};

			(repo.findFlightById as any).mockResolvedValue(null);

			await expect(
				operationService.createOperationalEvent(eventData),
			).rejects.toThrow();
		});

		it("should handle error when creating event", async () => {
			const mockFlight = { id: "1", flight_number: "FL001" };
			const eventData = {
				flight_id: "1",
				event_type: "delayed",
				severity: "high",
			};

			(repo.findFlightById as any).mockResolvedValue(mockFlight);
			(repo.create as any).mockRejectedValue(new Error("Database error"));

			await expect(
				operationService.createOperationalEvent(eventData),
			).rejects.toThrow("Database error");
		});
	});

	describe("updateEvent", () => {
		it("should update event successfully", async () => {
			const mockEvent = {
				id: "1",
				flight_id: "1",
				delay_minutes: 45,
			};
			const updateData = { delay_minutes: 45 };

			(repo.findById as any).mockResolvedValue(mockEvent);
			(repo.update as any).mockResolvedValue(mockEvent);

			const result = await operationService.updateEvent("1", "1", updateData);

			expect(repo.update).toHaveBeenCalledWith("1", updateData);
		});

		it("should throw error when event not found", async () => {
			(repo.findById as any).mockResolvedValue(null);

			await expect(
				operationService.updateEvent("1", "invalid-id", {}),
			).rejects.toThrow();
		});

		it("should handle update error", async () => {
			(repo.findById as any).mockResolvedValue({ id: "1" });
			(repo.update as any).mockRejectedValue(new Error("Update failed"));

			await expect(operationService.updateEvent("1", "1", {})).rejects.toThrow(
				"Update failed",
			);
		});
	});

	describe("getEventsByFlight", () => {
		it("should get events by flight successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001" };
			const mockEvents = [
				{ id: "1", flight_id: "1", event_type: "delayed" },
				{ id: "2", flight_id: "1", event_type: "cancelled" },
			];

			(repo.findFlightById as any).mockResolvedValue(mockFlight);
			(repo.findEventsByFlight as any).mockResolvedValue(mockEvents);

			const result = await operationService.getEventsByFlight("1");

			expect(result).toEqual(mockEvents);
			expect(repo.findEventsByFlight).toHaveBeenCalledWith("1");
		});

		it("should throw error when flight not found", async () => {
			(repo.findFlightById as any).mockResolvedValue(null);

			await expect(
				operationService.getEventsByFlight("invalid-id"),
			).rejects.toThrow();
		});

		it("should return empty array when no events for flight", async () => {
			const mockFlight = { id: "1", flight_number: "FL001" };

			(repo.findFlightById as any).mockResolvedValue(mockFlight);
			(repo.findEventsByFlight as any).mockResolvedValue([]);

			const result = await operationService.getEventsByFlight("1");

			expect(result).toEqual([]);
		});
	});

	describe("getAllFlightEvents", () => {
		it("should get all flight events successfully", async () => {
			const mockEvents = [
				{ id: "1", flight_id: "1", event_type: "delayed" },
				{ id: "2", flight_id: "2", event_type: "cancelled" },
			];

			(OperationalEvent.findAll as any).mockResolvedValue(mockEvents);

			const result = await operationService.getAllFlightEvents();

			expect(result).toEqual(mockEvents);
			expect(OperationalEvent.findAll).toHaveBeenCalled();
		});

		it("should return empty array when no events exist", async () => {
			(OperationalEvent.findAll as any).mockResolvedValue([]);

			const result = await operationService.getAllFlightEvents();

			expect(result).toEqual([]);
		});

		it("should handle database error when fetching all events", async () => {
			const error = new Error("Database error");
			(OperationalEvent.findAll as any).mockRejectedValue(error);

			await expect(operationService.getAllFlightEvents()).rejects.toThrow(
				"Database error",
			);
		});
	});
});
