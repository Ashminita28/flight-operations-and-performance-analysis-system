import { describe, it, expect, vi, beforeEach } from "vitest";
import * as repo from "../../src/repositories/aircraft-repository";
import { Aircraft, Flight } from "@package/shared-database";
import { Op } from "sequelize";

vi.mock("@package/shared-database");

describe("Aircraft Repository", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("createAircraftRepo", () => {
		it("should create aircraft in database", async () => {
			const mockAircraft = {
				id: "1",
				registration: "N12345",
				manufacturer: "Boeing",
				model: "737",
			};

			const data = {
				registration: "N12345",
				icao_type: "B737",
				manufacturer: "Boeing",
				model: "737",
				seat_capacity: 180,
				fuel_capacity_kg: "26000",
				max_payload_kg: "20000",
				year_of_manufacture: 2015,
				status: "active",
				base_airport_code: "JFK",
				notes: "Test aircraft",
			};

			(Aircraft.create as any).mockResolvedValue(mockAircraft);

			const result = await repo.createAircraftRepo(data as any);

			expect(result).toEqual(mockAircraft);
			expect(Aircraft.create).toHaveBeenCalledWith(data);
		});

		it("should handle database error when creating", async () => {
			const error = new Error("Database error");
			(Aircraft.create as any).mockRejectedValue(error);

			await expect(repo.createAircraftRepo({} as any)).rejects.toThrow(
				"Database error",
			);
		});
	});

	describe("getAllAircraftRepo", () => {
		it("should get all aircraft with default pagination", async () => {
			const mockResult = { rows: [], count: 0 };

			(Aircraft.findAndCountAll as any).mockResolvedValue(mockResult);

			const result = await repo.getAllAircraftRepo();

			expect(result).toEqual(mockResult);

			expect(Aircraft.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					limit: 10,
					offset: 0,
					order: [["createdAt", "DESC"]],
				}),
			);
		});

		it("should handle custom pagination options", async () => {
			const mockResult = { rows: [], count: 0 };

			(Aircraft.findAndCountAll as any).mockResolvedValue(mockResult);

			const result = await repo.getAllAircraftRepo({ page: 2, limit: 20 });

			expect(result).toEqual(mockResult);

			expect(Aircraft.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					limit: 20,
					offset: 20,
				}),
			);
		});

		it("should apply search filter when provided", async () => {
			const mockResult = { rows: [], count: 0 };

			(Aircraft.findAndCountAll as any).mockResolvedValue(mockResult);

			await repo.getAllAircraftRepo({ search: "Boeing" });

			expect(Aircraft.findAndCountAll).toHaveBeenCalledWith(
				expect.objectContaining({
					where: {
						[Op.or]: expect.any(Array),
					},
				}),
			);
		});

		it("should handle database error", async () => {
			const error = new Error("Query failed");

			(Aircraft.findAndCountAll as any).mockRejectedValue(error);

			await expect(repo.getAllAircraftRepo()).rejects.toThrow("Query failed");
		});
	});

	describe("getAircraftByIdRepo", () => {
		it("should get aircraft by id successfully", async () => {
			const mockAircraft = { id: "1", registration: "N12345" };

			(Aircraft.findByPk as any).mockResolvedValue(mockAircraft);

			const result = await repo.getAircraftByIdRepo("1");

			expect(result).toEqual(mockAircraft);
			expect(Aircraft.findByPk).toHaveBeenCalledWith("1");
		});

		it("should return null when aircraft not found", async () => {
			(Aircraft.findByPk as any).mockResolvedValue(null);

			const result = await repo.getAircraftByIdRepo("invalid-id");

			expect(result).toBeNull();
		});

		it("should handle database error", async () => {
			const error = new Error("Database error");

			(Aircraft.findByPk as any).mockRejectedValue(error);

			await expect(repo.getAircraftByIdRepo("1")).rejects.toThrow(
				"Database error",
			);
		});
	});

	describe("updateAircraftRepo", () => {
		it("should update aircraft successfully", async () => {
			const mockAircraft = {
				id: "1",
				update: vi.fn().mockResolvedValue({ status: "inactive" }),
			};

			(Aircraft.findByPk as any).mockResolvedValue(mockAircraft);

			const result = await repo.updateAircraftRepo("1", {
				status: "inactive",
			} as any);

			expect(mockAircraft.update).toHaveBeenCalledWith({ status: "inactive" });
			expect(result).toEqual({ status: "inactive" });
		});

		it("should return null when aircraft not found", async () => {
			(Aircraft.findByPk as any).mockResolvedValue(null);

			const result = await repo.updateAircraftRepo("invalid-id", {} as any);

			expect(result).toBeNull();
		});
	});

	describe("changeAircraftStatusRepo", () => {
		it("should change aircraft status successfully", async () => {
			const mockAircraft = {
				update: vi.fn().mockResolvedValue({ status: "maintenance" }),
			};

			(Aircraft.findByPk as any).mockResolvedValue(mockAircraft);

			const result = await repo.changeAircraftStatusRepo("1", "maintenance");

			expect(mockAircraft.update).toHaveBeenCalledWith({
				status: "maintenance",
			});
			expect(result).toEqual({ status: "maintenance" });
		});

		it("should return null when aircraft not found", async () => {
			(Aircraft.findByPk as any).mockResolvedValue(null);

			const result = await repo.changeAircraftStatusRepo(
				"invalid-id",
				"active",
			);

			expect(result).toBeNull();
		});
	});

	describe("deleteAircraftRepo", () => {
		it("should delete aircraft successfully", async () => {
			const mockAircraft = {
				destroy: vi.fn().mockResolvedValue(undefined),
			};

			(Aircraft.findByPk as any).mockResolvedValue(mockAircraft);

			const result = await repo.deleteAircraftRepo("1");

			expect(result).toBe(true);
			expect(mockAircraft.destroy).toHaveBeenCalled();
		});

		it("should return false when aircraft not found", async () => {
			(Aircraft.findByPk as any).mockResolvedValue(null);

			const result = await repo.deleteAircraftRepo("invalid-id");

			expect(result).toBe(false);
		});
	});

	describe("getAircraftOnDateRepo", () => {
		it("should get available aircraft for a specific date", async () => {
			const mockAvailableAircraft = [{ id: "3", registration: "N99999" }];

			(Flight.findAll as any).mockResolvedValue([
				{ aircraft_id: "1" },
				{ aircraft_id: "2" },
			]);

			(Aircraft.findAll as any).mockResolvedValue(mockAvailableAircraft);

			const result = await repo.getAircraftOnDateRepo("2025-03-12");

			expect(result).toEqual(mockAvailableAircraft);

			expect(Flight.findAll).toHaveBeenCalledWith({
				where: { flight_date: "2025-03-12" },
				attributes: ["aircraft_id"],
			});

			expect(Aircraft.findAll).toHaveBeenCalledWith({
				where: {
					id: { [Op.notIn]: ["1", "2"] },
				},
			});
		});

		it("should return all aircraft when none are busy", async () => {
			const mockAllAircraft = [
				{ id: "1", registration: "N12345" },
				{ id: "2", registration: "N67890" },
			];

			(Flight.findAll as any).mockResolvedValue([]);
			(Aircraft.findAll as any).mockResolvedValue(mockAllAircraft);

			const result = await repo.getAircraftOnDateRepo("2025-03-12");

			expect(result).toEqual(mockAllAircraft);
		});
	});
});
