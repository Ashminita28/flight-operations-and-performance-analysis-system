import { Request, Response, NextFunction } from "express";
import { FlightPerformanceService } from "../services/performance-service";
import { createFlightPerformanceSchema } from "../validation/performance-validation";

export const FlightPerformanceController = {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const flightId = req.params.flightId;
			const {
				fuel_used_kg,
				distance_km,
				passengers_count,
				payload_kg,
				flight_time_minutes,
			} = req.body;
			const validated = createFlightPerformanceSchema.parse({
				flight_id: flightId,
				fuel_used_kg,
				distance_km,
				passengers_count,
				payload_kg,
				flight_time_minutes,
			});

			const performance =
				await FlightPerformanceService.createPerformance(validated);

			return res.status(201).json({
				success: true,
				message: "Flight performance recorded successfully",
				data: performance,
			});
		} catch (error) {
			next(error);
		}
	},

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await FlightPerformanceService.getAllPerformance();

			return res.status(200).json({
				success: true,
				data,
			});
		} catch (error) {
			next(error);
		}
	},
	async geFlightPerformance(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await FlightPerformanceService.getFlightPerformanceById(
				req.params.flight_id as string,
			);
			return res.status(200).json({
				success: true,
				data,
			});
		} catch (error) {
			next(error);
		}
	},
};
