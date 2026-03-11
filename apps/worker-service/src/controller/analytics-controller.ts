import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../services/analytics-service";
import { publishReports } from "../rabbitmq/report-publisher";

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

	async getSummaryTable(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await analyticsService.getSummaryTableService(req.query);
			res.status(200).json({
				success: true,
				message: "analytics table",
				data: result,
			});
		} catch (error) {
			next(error);
		}
	},

	async exportAnalytics(req: Request, res: Response, next: NextFunction) {
		try {
			const filters = req.query;
			const userEmail =
				typeof req.query.email === "string" ? req.query.email : "";
			await publishReports("analytics_export_queue", {
				filters,
				userEmail,
			});
			res.json({
				message:
					"Export request submitted. You will receive an email when ready.",
			});
		} catch (error) {
			next(error);
		}
	},
};
