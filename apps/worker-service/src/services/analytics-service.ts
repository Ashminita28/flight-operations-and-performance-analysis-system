import { analyticsRepository } from "../repositories/analytics-repository";
import {
	AnalyticsFilters,
	ExportReportParams,
	OnTimePerformanceDataPoint,
	DelayAnalysisDataPoint,
	DashboardCounters,
} from "../types/analytics-filters";
import path from "path";
import fs from "fs";
import { Parser } from "json2csv";
import { ApiError, HTTP_STATUS, MESSAGES } from "@package/shared-utils";
import {
	ANALYTICS_MESSAGES,
	CSV_EXPORT_CONFIG,
} from "../constants/analytics-constants";
import { v4 as uuidv4 } from "uuid";
import { getDateRangeByFilter } from "../utils/date-range-filter";
import { isValidEmail } from "../validations/email-validationn";

export const analyticsService = {
	//  Get dashboard counters for current date or time period
	async getDashboardCounterService(
		query: AnalyticsFilters,
	): Promise<DashboardCounters> {
		try {
			const counters = await analyticsRepository.getDashboardCounter(query);
			return counters;
		} catch (error) {
			throw new ApiError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				"Failed to retrieve dashboard counters",
			);
		}
	},

	// Get delay analysis data for pie chart visualization
	async getDelayAnalytics(
		query: AnalyticsFilters,
	): Promise<DelayAnalysisDataPoint[]> {
		try {
			const result = await analyticsRepository.getDelayAnalytics(query);

			if (!result || result.length === 0) {
				return [];
			}

			return result;
		} catch (error) {
			throw new ApiError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				"Failed to retrieve delay analytics",
			);
		}
	},

	// Get on-time performance data for line chart visualization
	async getOnTimePerformance(
		query: AnalyticsFilters,
	): Promise<OnTimePerformanceDataPoint[]> {
		try {
			const performance = await analyticsRepository.getOnTimePerformance(query);

			if (!performance || performance.length === 0) {
				return [];
			}

			return performance;
		} catch (error) {
			throw new ApiError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				"Failed to retrieve on-time performance data",
			);
		}
	},

	// Get active flights for current date
	async getActiveFligthsService(query: AnalyticsFilters) {
		try {
			const result =
				await analyticsRepository.getActiveFlightsInformation(query);

			if (!result) {
				throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.FLIGHT_NOT_FOUND);
			}

			return result;
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				"Failed to retrieve active flights",
			);
		}
	},

	// initialize report generation
	async initiateExportReportService(
		exportParams: ExportReportParams,
	): Promise<{ job_id: string; message: string }> {
		try {
			// Validate email format
			if (!isValidEmail(exportParams.email)) {
				throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Invalid email address");
			}

			// Generate unique job ID
			const jobId = uuidv4();

			// Get date range based on time filter
			const dateRange = getDateRangeByFilter(exportParams.time_filter);

			// Get export data from repository
			const exportData = await analyticsRepository.getExportData({
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				origin_airport: exportParams.origin_airport,
				destination_airport: exportParams.destination_airport,
				aircraft_id: exportParams.aircraft_id,
			});

			if (!exportData || exportData.length === 0) {
				throw new ApiError(
					HTTP_STATUS.NOT_FOUND,
					ANALYTICS_MESSAGES.NO_DATA_AVAILABLE,
				);
			}

			// Prepare CSV data
			const csvData = this.generateCSVData(exportData);
			const fileName = `${CSV_EXPORT_CONFIG.file_prefix}_${jobId}.csv`;

			// Ensure export directory exists
			const exportDir = path.join(
				__dirname,
				"..",
				"..",
				CSV_EXPORT_CONFIG.export_dir,
			);
			if (!fs.existsSync(exportDir)) {
				fs.mkdirSync(exportDir, { recursive: true });
			}

			const filePath = path.join(exportDir, fileName);

			// Write CSV to file
			fs.writeFileSync(filePath, csvData);

			// Return job ID and message
			return {
				job_id: jobId,
				message: `Export report generated successfully. File: ${fileName}`,
			};
		} catch (error) {
			if (error instanceof ApiError) {
				throw error;
			}
			throw new ApiError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				ANALYTICS_MESSAGES.EXPORT_GENERATION_FAILED,
			);
		}
	},

	// Generate CSV content from analytics data
	generateCSVData(data: any[]): string {
		try {
			const fields = CSV_EXPORT_CONFIG.fields;
			const parser = new Parser({ fields });
			return parser.parse(data);
		} catch (error) {
			throw new ApiError(
				HTTP_STATUS.INTERNAL_SERVER_ERROR,
				"Failed to generate CSV data",
			);
		}
	},
};
