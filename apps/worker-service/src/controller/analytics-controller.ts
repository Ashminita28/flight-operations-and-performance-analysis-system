import { Request, Response, NextFunction } from "express";
import { analyticsService } from "../services/analytics-service";
import { publishReports } from "../rabbitmq/report-publisher";
import { HTTP_STATUS, MESSAGES } from "@package/shared-utils";
import { ExportReportParams } from "../types/analytics-filters";
import { sendResponse } from "@package/shared-utils";
export const analyticsController = {
	async getCounterController(req: Request, res: Response, next: NextFunction) {
		try {
			const counters = await analyticsService.getDashboardCounterService(
				req.query as never,
			);
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				message: MESSAGES.DASHBOARD_COUNTER,
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				message: MESSAGES.ON_TIME_PERFORMANCE,
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				message: MESSAGES.DELAY_ANALYTICS,
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

			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				message: MESSAGES.ACTIVE_FLIGHTS_TABLE,
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
				return sendResponse({
					res,
					statusCode: HTTP_STATUS.BAD_REQUEST,
					success: false,
					message: MESSAGES.TIME_FILTER,
				});
			}

			if (!exportParams.email) {
				return sendResponse({
					res,
					statusCode: HTTP_STATUS.BAD_REQUEST,
					success: false,
					message: MESSAGES.EMAIL_REQUIRED,
				});
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

			return sendResponse({
				res,
				statusCode: HTTP_STATUS.CREATED,
				success: true,
				message: exportResult.job_id,
				data: { job_id: exportResult.job_id },
			});
		} catch (error) {
			next(error);
		}
	},
};
