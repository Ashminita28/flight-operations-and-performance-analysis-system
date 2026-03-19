// Filter types for time-based aggregations
export type TimeFilter =
	| "last_hour"
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly";
export type ChartTimeFilter = "weekly" | "monthly" | "yearly";

// Generic analytics filter interface
export interface AnalyticsFilters {
	startDate?: string;
	endDate?: string;
	origin_airport?: string;
	destination_airport?: string;
	aircraft_id?: string;
	page?: number;
	limit?: number;
	search?: string;
	time_filter?: TimeFilter;
	sort_by?: "route" | "status" | "date";
	sort_order?: "ASC" | "DESC";
}

// Dashboard counters response
export interface DashboardCounters {
	total_flights: number;
	active_flights: number;
	on_time_flights: number;
	delayed_flights: number;
	on_time_performance_pct: number;
}

// On-time performance data point
export interface OnTimePerformanceDataPoint {
	date: string;
	period: string;
	on_time_percentage: number;
	total_flights: number;
	on_time_flights: number;
}

// Delay analysis data point
export interface DelayAnalysisDataPoint {
	category: string;
	count: number;
	percentage: number;
}

// Active flight record
export interface ActiveFlight {
	id: string;
	flight_number: string;
	airline_code: string;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	status: "scheduled" | "boarding" | "departed";
	scheduled_departure: string;
	scheduled_arrival: string;
	estimated_departure?: string;
	estimated_arrival?: string;
	gate_departure?: string;
	gate_arrival?: string;
	flight_date: string;
}

// Analytics summary data
export interface AnalyticsSummaryData {
	id: string;
	date: string;
	origin_airport: string;
	destination_airport: string;
	delay_category?: string;
	aircraft_id: string;
	total_flights: number;
	delayed_flights: number;
	avg_delay_minutes: number;
	total_flight_hours: number;
	avg_fuel_efficiency: number;
	avg_load_factor_pct: number;
	createdAt: Date;
	updatedAt: Date;
}

// Pagination response wrapper
export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

// Export report parameters
export interface ExportReportParams {
	time_filter: TimeFilter;
	origin_airport?: string;
	destination_airport?: string;
	aircraft_id?: string;
	email: string;
}

// Report export job
export interface ReportExportJob {
	id: string;
	filters: ExportReportParams;
	status: "pending" | "processing" | "completed" | "failed";
	file_path?: string;
	error_message?: string;
	created_at: Date;
	completed_at?: Date;
}
