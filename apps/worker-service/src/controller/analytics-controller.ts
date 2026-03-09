import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../services/analytics-service";

export const analyticsController = {
	async getCounterController(req: Request, res: Response, next: NextFunction) {
		try {
			const counter = await analyticsService.getDashboardCounterService();
			res.status(200).json({
				success: true,
				message: "Counter are here",
				data: counter,
			});
		} catch (error) {
			next(error);
		}
	},
	async getOnTimeController(req: Request, res: Response, next: NextFunction) {
		try {
			const onTime = await analyticsService.getOnTimePerformanceChart();
			res.status(200).json({
				success: true,
				message: "on time performance",
				data: onTime,
			});
		} catch (error) {
			next(error);
		}
	},
};
