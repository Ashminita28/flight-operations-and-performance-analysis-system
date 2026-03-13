import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../services/analytics-service";
import { publishReports } from "../rabbitmq/report-publisher";
import { HTTP_STATUS } from "@package/shared-utils";
import { ExportReportParams } from "../types/analytics-filters";

export const analyticsController = {
	async getCounterController(req: Request, res: Response, next: NextFunction) {
		try {
			const counters = await analyticsService.getDashboardCounterService(
				req.query as never,
			);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: "Dashboard counters retrieved successfully",
				data: counters,
			});
		} catch (error) {
			next(error);
		}
	},

	// ON TIME PERFORMANCE CHART
	async getOnTimeController(req: Request, res: Response, next: NextFunction) {
		try {
			const onTimeData = await analyticsService.getOnTimePerformance(
				req.query as never,
			);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: "On-time performance data retrieved successfully",
				data: onTimeData,
			});
		} catch (error) {
			next(error);
		}
	},

	// DELAY ANALYTICS PIE CHART
	async getDelayAnalytics(req: Request, res: Response, next: NextFunction) {
		try {
			const delayData = await analyticsService.getDelayAnalytics(
				req.query as never,
			);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: "Delay analysis data retrieved successfully",
				data: delayData,
			});
		} catch (error) {
			next(error);
		}
	},

	async getActiveFlightsController(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const result = await analyticsService.getActiveFligthsService(
				req.query as never,
			);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: "Active flights retrieved successfully",
				data: result.data,
				pagination: result.pagination,
			});
		} catch (error) {
			next(error);
		}
	},

	async exportAnalyticsController(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const exportParams: ExportReportParams = {
				time_filter: req.body.time_filter,
				origin_airport: req.body.origin_airport,
				destination_airport: req.body.destination_airport,
				aircraft_id: req.body.aircraft_id,
				email: req.body.email,
			};

			// Validate required fields
			if (!exportParams.time_filter) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: "time_filter is required",
				});
				return;
			}

			if (!exportParams.email) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: "email is required",
				});
				return;
			}

			// Initiate export
			const exportResult =
				await analyticsService.initiateExportReportService(exportParams);

			// Publish to RabbitMQ for async processing
			await publishReports("analytics_export_queue", {
				job_id: exportResult.job_id,
				filters: exportParams,
				timestamp: new Date(),
			});

			res.status(HTTP_STATUS.CREATED).json({
				success: true,
				message: exportResult.message,
				data: {
					job_id: exportResult.job_id,
				},
			});
		} catch (error) {
			next(error);
		}
	},
};
