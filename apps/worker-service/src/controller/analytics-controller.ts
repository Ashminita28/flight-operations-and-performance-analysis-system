import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../services/analytics-service";

export const analyticsController = {
	async getCounterController(req: Request, res: Response, next: NextFunction) {
		try {
			const counter = await analyticsService.getDashboardCounterService(
				req.query,
			);

			res.status(200).json({
				success: true,
				message: "Counter are here",
				data: counter,
			});
		} catch (error) {
			next(error);
		}
	},

	// ON TIME PERFORMANCE CHART
	async getOnTimeController(req: Request, res: Response, next: NextFunction) {
		try {
			const onTime = await analyticsService.getOnTimePerformance(req.query);

			res.status(200).json({
				success: true,
				message: "on time performance",
				data: onTime,
			});
		} catch (error) {
			next(error);
		}
	},

	// DELAY ANALYTICS PIE CHART
	async getDelayAnalytics(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await analyticsService.getDelayAnalytics(req.query);

			res.status(200).json({
				success: true,
				message: "delay analytics",
				data: result,
			});
		} catch (error) {
			next(error);
		}
	},
};
