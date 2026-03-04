import { Request, Response, NextFunction } from "express";
import { operationService } from "../services/operation-service";
import { createOperationalEventSchema } from "../validations/operational-event-validation";
export const OperationController = {
	async recordFlightEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const flightId = req.params.flightId;
			const {
				event_type,
				delay_category_id,
				delay_minutes,
				description,
				event_time,
				severity,
			} = req.body;
			console.log("valid:-", req.body);
			const validate = createOperationalEventSchema.parse({
				flight_id: flightId,
				event_type,
				delay_category_id,
				delay_minutes,
				description,
				event_time,
				severity,
			});
			const event = await operationService.createOperationalEvent(validate);
			res.status(200).json({
				success: true,
				message: "Operational event recorded successfully",
				data: event,
			});
		} catch (error) {
			next(error);
		}
	},

	async changeFlightEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const event = await operationService.updateEvent(
				req.params.flightId as string,
				req.params.id as string,
				req.body,
			);
			res.status(200).json({
				success: true,
				data: event,
			});
		} catch (error) {
			next(error);
		}
	},

	async getByFlight(req: Request, res: Response, next: NextFunction) {
		try {
			console.log("cannot get_=", req.params.flight_id);
			const events = await operationService.getEventsByFlight(
				req.params.flight_id as string,
			);

			return res.status(200).json({
				success: true,
				data: events,
			});
		} catch (error) {
			next(error);
		}
	},

	async getAllEvents(req: Request, res: Response, next: NextFunction) {
		try {
			const events = await operationService.getAllFlightEvents();
			return res.status(200).json({
				success: true,
				data: events,
			});
		} catch (error) {
			next(error);
		}
	},
};
