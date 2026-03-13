import { describe, it, expect, vi, beforeEach } from "vitest";
import * as service from "../../src/services/aircraft-service";
import * as repo from "../../src/repositories/aircraft-repository";
import { Aircraft, Flight, Airport } from "@package/shared-database";
import { ApiError } from "@package/shared-utils";

vi.mock("../../src/repositories/aircraft-repository");
vi.mock("@package/shared-database");

describe("Aircraft Service", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("createAircraft", () => {
		it("should create aircraft successfully", async () => {
			const mockAircraft = {
				id: "1",
				registration: "N12345",
				manufacturer: "Boeing",
				model: "737",
			};
			const data = {
				registration: "N12345",
				manufacturer: "Boeing",
				model: "737",
				icao_type: "B737",
			};

			(repo.createAircraftRepo as any).mockResolvedValue(mockAircraft);

			const result = await service.createAircraft(data as any);

			expect(result).toEqual(mockAircraft);
			expect(repo.createAircraftRepo).toHaveBeenCalledWith(data);
		});

		it("should handle database error when creating aircraft", async () => {
			const data = { registration: "N12345" };
			const error = new Error("Database error");

			(repo.createAircraftRepo as any).mockRejectedValue(error);

			await expect(service.createAircraft(data as any)).rejects.toThrow(
				"Database error",
			);
		});
	});

	describe("getAllAircraft", () => {
		it("should get all aircraft successfully", async () => {
			const mockAircraft = [
				{ id: "1", registration: "N12345" },
				{ id: "2", registration: "N67890" },
			];

			(repo.getAllAircraftRepo as any).mockResolvedValue(mockAircraft);

			const result = await service.getAllAircraft();

			expect(result).toEqual(mockAircraft);
			expect(repo.getAllAircraftRepo).toHaveBeenCalled();
		});

		it("should get aircraft with pagination options", async () => {
			const mockAircraft = { rows: [], count: 0 };
			const options = { page: 2, limit: 20 };

			(repo.getAllAircraftRepo as any).mockResolvedValue(mockAircraft);

			const result = await service.getAllAircraft(options);

			expect(result).toEqual(mockAircraft);
			expect(repo.getAllAircraftRepo).toHaveBeenCalledWith(options);
		});

		it("should handle error when fetching aircraft", async () => {
			const error = new Error("Database connection failed");
			(repo.getAllAircraftRepo as any).mockRejectedValue(error);

			await expect(service.getAllAircraft()).rejects.toThrow(
				"Database connection failed",
			);
		});
	});

	describe("getAircraftById", () => {
		it("should get aircraft by id successfully", async () => {
			const mockAircraft = { id: "1", registration: "N12345" };

			(repo.getAircraftByIdRepo as any).mockResolvedValue(mockAircraft);

			const result = await service.getAircraftById("1");

			expect(result).toEqual(mockAircraft);
			expect(repo.getAircraftByIdRepo).toHaveBeenCalledWith("1");
		});

		it("should throw error when aircraft not found", async () => {
			(repo.getAircraftByIdRepo as any).mockResolvedValue(null);

			await expect(service.getAircraftById("invalid-id")).rejects.toThrow();
		});

		it("should handle database error", async () => {
			const error = new Error("Database error");
			(repo.getAircraftByIdRepo as any).mockRejectedValue(error);

			await expect(service.getAircraftById("1")).rejects.toThrow(
				"Database error",
			);
		});
	});

	describe("updateAircraft", () => {
		it("should update aircraft successfully", async () => {
			const mockAircraft = { id: "1", registration: "N12345" };
			const updateData = { status: "inactive" };

			(repo.getAircraftByIdRepo as any).mockResolvedValue(mockAircraft);
			(repo.updateAircraftRepo as any).mockResolvedValue({
				...mockAircraft,
				...updateData,
			});

			const result = await service.updateAircraft("1", updateData as any);

			expect(result).toBeDefined();
			expect(repo.updateAircraftRepo).toHaveBeenCalledWith("1", updateData);
		});

		it("should throw error when aircraft not found", async () => {
			(repo.getAircraftByIdRepo as any).mockResolvedValue(null);

			await expect(
				service.updateAircraft("invalid-id", {} as any),
			).rejects.toThrow();
		});

		it("should handle update error", async () => {
			const mockAircraft = { id: "1" };
			(repo.getAircraftByIdRepo as any).mockResolvedValue(mockAircraft);
			(repo.updateAircraftRepo as any).mockRejectedValue(
				new Error("Update failed"),
			);

			await expect(service.updateAircraft("1", {} as any)).rejects.toThrow(
				"Update failed",
			);
		});
	});

	describe("changeAircraftStatus", () => {
		it("should change aircraft status successfully", async () => {
			const mockAircraft = {
				id: "1",
				update: vi.fn().mockResolvedValue({ status: "maintenance" }),
			};

			(Aircraft.findByPk as any).mockResolvedValue(mockAircraft);

			const result = await service.changeAircraftStatus("1", "maintenance");

			expect(mockAircraft.update).toHaveBeenCalledWith({
				status: "maintenance",
			});
		});

		it("should throw error when aircraft not found", async () => {
			(Aircraft.findByPk as any).mockResolvedValue(null);

			await expect(
				service.changeAircraftStatus("invalid-id", "maintenance"),
			).rejects.toThrow();
		});
	});

	describe("deleteAircraft", () => {
		it("should delete aircraft successfully", async () => {
			const mockAircraft = {
				id: "1",
				destroy: vi.fn().mockResolvedValue(undefined),
			};

			(Aircraft.findByPk as any).mockResolvedValue(mockAircraft);

			const result = await service.deleteAircraft("1");

			expect(result).toBe(true);
			expect(mockAircraft.destroy).toHaveBeenCalled();
		});

		it("should throw error when aircraft not found", async () => {
			(Aircraft.findByPk as any).mockResolvedValue(null);

			await expect(service.deleteAircraft("invalid-id")).rejects.toThrow();
		});
	});

	describe("getAircraftOnDate", () => {
		it("should get available aircraft on a specific date", async () => {
			const mockAvailableAircraft = [{ id: "1", registration: "N12345" }];

			(Flight.findAll as any).mockResolvedValue([]);
			(Aircraft.findAll as any).mockResolvedValue(mockAvailableAircraft);

			const result = await service.getAircraftOnDate("2025-03-12");

			expect(result).toEqual(mockAvailableAircraft);
			expect(Flight.findAll).toHaveBeenCalledWith(
				expect.objectContaining({ where: { flight_date: "2025-03-12" } }),
			);
		});

		it("should exclude busy aircraft from available list", async () => {
			const busyFlights = [{ aircraft_id: "1" }, { aircraft_id: "2" }];

			(Flight.findAll as any).mockResolvedValue(busyFlights);
			(Aircraft.findAll as any).mockResolvedValue([
				{ id: "3", registration: "N99999" },
			]);

			const result = await service.getAircraftOnDate("2025-03-12");

			expect(Aircraft.findAll).toHaveBeenCalled();
			expect(result).toHaveLength(1);
		});

		it("should handle error when fetching aircraft on date", async () => {
			const error = new Error("Query failed");
			(Flight.findAll as any).mockRejectedValue(error);

			await expect(service.getAircraftOnDate("2025-03-12")).rejects.toThrow(
				"Query failed",
			);
		});
	});

	describe("getAllAirports", () => {
		it("should get all airports successfully", async () => {
			const mockAirports = [
				{ id: "1", code: "NYC", name: "New York" },
				{ id: "2", code: "LAX", name: "Los Angeles" },
			];

			(Airport.findAll as any).mockResolvedValue(mockAirports);

			const result = await service.getAllAirports();

			expect(result).toEqual(mockAirports);
			expect(Airport.findAll).toHaveBeenCalled();
		});

		it("should handle error when fetching airports", async () => {
			const error = new Error("Database error");
			(Airport.findAll as any).mockRejectedValue(error);

			await expect(service.getAllAirports()).rejects.toThrow("Database error");
		});
	});
});
