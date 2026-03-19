import { Request, Response, NextFunction } from "express";
import { FlightPerformanceService } from "../services/performance-service";
import { createFlightPerformanceSchema } from "../validation/performance-validation";
import { HTTP_STATUS, MESSAGES } from "@package/shared-utils";
import { sendResponse } from "@package/shared-utils";

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

			return sendResponse({
				res,
				statusCode: HTTP_STATUS.CREATED,
				success: true,
				message: MESSAGES.PERFORMANCE_CREATED,
				data: performance,
			});
		} catch (error) {
			next(error);
		}
	},

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const performance = await FlightPerformanceService.getAllPerformance();
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				data: performance,
			});
		} catch (error) {
			next(error);
		}
	},
	async geFlightPerformance(req: Request, res: Response, next: NextFunction) {
		try {
			const performance =
				await FlightPerformanceService.getFlightPerformanceById(
					req.params.flight_id as string,
				);
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				data: performance,
			});
		} catch (error) {
			next(error);
		}
	},
};
