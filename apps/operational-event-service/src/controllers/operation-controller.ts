import { Request, Response, NextFunction } from "express";
import { operationService } from "../services/operation-service";
import { createOperationalEventSchema } from "../validations/operational-event-validation";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.CREATED,
				success: true,
				message: MESSAGES.OPERATION_CREATED,
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				data: event,
			});
		} catch (error) {
			next(error);
		}
	},

	async getByFlight(req: Request, res: Response, next: NextFunction) {
		try {
			const events = await operationService.getEventsByFlight(
				req.params.flight_id as string,
			);
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				data: events,
			});
		} catch (error) {
			next(error);
		}
	},
};
