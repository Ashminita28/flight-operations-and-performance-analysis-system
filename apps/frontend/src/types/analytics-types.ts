import type { Paginationpagination } from "./flight-types";

// Analytics Types
export type TimeFilter =
	| "last_hour"
	| "daily"
	| "weekly"
	| "monthly"
	| "yearly";
export type ChartTimeFilter = "weekly" | "monthly" | "yearly";

export interface DashboardCounters {
	total_flights: number;
	active_flights: number;
	on_time_flights: number;
	delayed_flights: number;
	on_time_performance_pct: number;
}

export interface OnTimePerformanceDataPoint {
	date: string;
	period: string;
	on_time_percentage: number;
	total_flights: number;
	on_time_flights: number;
}

export interface DelayAnalysisDataPoint {
	category: string;
	count: number;
	percentage: number;
}

export type ActiveFlightStatus = "scheduled" | "boarding" | "departed";
export interface ActiveFlightData {
	id: string;
	flight_number: string;
	airline_code: string;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	status: ActiveFlightStatus;
	scheduled_departure: string;
	scheduled_arrival: string;
	estimated_departure?: string;
	estimated_arrival?: string;
	gate_departure?: string;
	gate_arrival?: string;
	flight_date: string;
}

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

export interface AnalyticsCountersResponse {
	success: boolean;
	message: string;
	data: DashboardCounters;
}

export interface AnalyticsChartResponse {
	success: boolean;
	message: string;
	data: OnTimePerformanceDataPoint[] | DelayAnalysisDataPoint[];
}

export interface ActiveFlightsResponse {
	success: boolean;
	message: string;
	data: ActiveFlightData[];
	pagination: Paginationpagination;
}
