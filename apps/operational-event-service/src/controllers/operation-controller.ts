import { Request, Response, NextFunction } from "express";
import { operationService } from "../services/operation-service";
export const OperationController = {
	async recordFlightEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const event = await operationService.createOperationalEvent(req.body);
			res.status(200).json({
				success: true,
				data: event,
			});
		} catch (error) {
			next(error);
		}
	},

	async changeFlightEvent(req: Request, res: Response, next: NextFunction) {
		try {
			const event = await operationService.updateEvent();
			res.status(200).json({
				success: true,
				data: event,
			});
		} catch (error) {
			next(error);
		}
	},
};
