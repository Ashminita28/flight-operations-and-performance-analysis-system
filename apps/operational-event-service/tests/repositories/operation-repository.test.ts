import { describe, it, expect, vi, beforeEach } from "vitest";
import * as repo from "../../src/repositories/operation-repository";
import { Flight, OperationalEvent } from "@package/shared-database";

vi.mock("@package/shared-database");

describe("Operation Repository", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("create", () => {
		it("should create operational event successfully", async () => {
			const mockEvent = {
				id: "1",
				flight_id: "1",
				event_type: "delayed",
				severity: "high",
			};
			const data = {
				flight_id: "1",
				event_type: "delayed",
				severity: "high",
			};

			(OperationalEvent.create as any).mockResolvedValue(mockEvent);

			const result = await repo.create(data);

			expect(result).toEqual(mockEvent);
			expect(OperationalEvent.create).toHaveBeenCalledWith(data);
		});

		it("should handle create error", async () => {
			const error = new Error("Database error");
			(OperationalEvent.create as any).mockRejectedValue(error);

			await expect(repo.create({})).rejects.toThrow("Database error");
		});
	});

	describe("findFlightById", () => {
		it("should find flight by id successfully", async () => {
			const mockFlight = { id: "1", flight_number: "FL001" };

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			const result = await repo.findFlightById("1");

			expect(result).toEqual(mockFlight);
			expect(Flight.findByPk).toHaveBeenCalledWith("1");
		});

		it("should return null when flight not found", async () => {
			(Flight.findByPk as any).mockResolvedValue(null);

			const result = await repo.findFlightById("invalid-id");

			expect(result).toBeNull();
		});

		it("should handle database error", async () => {
			const error = new Error("Database error");
			(Flight.findByPk as any).mockRejectedValue(error);

			await expect(repo.findFlightById("1")).rejects.toThrow("Database error");
		});
	});

	describe("findById", () => {
		it("should find event by id successfully", async () => {
			const mockEvent = { id: "1", flight_id: "1", event_type: "delayed" };

			(OperationalEvent.findByPk as any).mockResolvedValue(mockEvent);

			const result = await repo.findById("1");

			expect(result).toEqual(mockEvent);
			expect(OperationalEvent.findByPk).toHaveBeenCalledWith("1");
		});

		it("should return null when event not found", async () => {
			(OperationalEvent.findByPk as any).mockResolvedValue(null);

			const result = await repo.findById("invalid-id");

			expect(result).toBeNull();
		});
	});

	describe("update", () => {
		it("should update event successfully", async () => {
			const updateData = { delay_minutes: 45 };
			const mockResult = [1];

			(OperationalEvent.update as any).mockResolvedValue(mockResult);

			const result = await repo.update("1", updateData);

			expect(result).toEqual(mockResult);
			expect(OperationalEvent.update).toHaveBeenCalledWith(
				updateData,
				expect.objectContaining({ where: { id: "1" } }),
			);
		});

		it("should handle update error", async () => {
			const error = new Error("Update failed");
			(OperationalEvent.update as any).mockRejectedValue(error);

			await expect(repo.update("1", {})).rejects.toThrow("Update failed");
		});
	});

	describe("updateFlightStatusRepo", () => {
		it("should update flight status successfully", async () => {
			const mockFlight = {
				id: "1",
				update: vi.fn().mockResolvedValue({ status: "in_flight" }),
			};

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			const result = await repo.updateFlightStatusRepo("1", "in_flight");

			expect(mockFlight.update).toHaveBeenCalledWith({ status: "in_flight" });
		});

		it("should return null when flight not found", async () => {
			(Flight.findByPk as any).mockResolvedValue(null);

			const result = await repo.updateFlightStatusRepo("invalid-id", "active");

			expect(result).toBeNull();
		});

		it("should handle update error", async () => {
			const mockFlight = {
				id: "1",
				update: vi.fn().mockRejectedValue(new Error("Update failed")),
			};

			(Flight.findByPk as any).mockResolvedValue(mockFlight);

			await expect(
				repo.updateFlightStatusRepo("1", "in_flight"),
			).rejects.toThrow("Update failed");
		});
	});

	describe("findEventsByFlight", () => {
		it("should find events by flight successfully", async () => {
			const mockEvents = [
				{ id: "1", flight_id: "1", event_type: "delayed" },
				{ id: "2", flight_id: "1", event_type: "cancelled" },
			];

			(OperationalEvent.findAll as any).mockResolvedValue(mockEvents);

			const result = await repo.findEventsByFlight("1");

			expect(result).toEqual(mockEvents);
			expect(OperationalEvent.findAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: { flight_id: "1" },
				}),
			);
		});

		it("should return empty array when no events for flight", async () => {
			(OperationalEvent.findAll as any).mockResolvedValue([]);

			const result = await repo.findEventsByFlight("1");

			expect(result).toEqual([]);
		});

		it("should handle database error", async () => {
			const error = new Error("Query failed");
			(OperationalEvent.findAll as any).mockRejectedValue(error);

			await expect(repo.findEventsByFlight("1")).rejects.toThrow(
				"Query failed",
			);
		});
	});
});
