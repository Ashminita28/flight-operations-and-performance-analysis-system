// Time filter mappings and utilities
export const TIME_FILTER_CONFIG = {
	last_hour: {
		label: "Last Hour",
		minutes: 60,
	},
	daily: {
		label: "Daily",
		days: 1,
	},
	weekly: {
		label: "Weekly",
		days: 7,
	},
	monthly: {
		label: "Monthly",
		days: 30,
	},
	yearly: {
		label: "Yearly",
		days: 365,
	},
};

// Chart aggregation periods
export const CHART_AGGREGATION = {
	weekly: "week",
	monthly: "month",
	yearly: "year",
};

// Default pagination values
export const DEFAULT_PAGINATION = {
	page: 1,
	limit: 20,
	max_limit: 100,
};

// Active flight statuses
export const ACTIVE_FLIGHT_STATUSES = ["scheduled", "boarding", "departed"];

// Delay thresholds in minutes
export const DELAY_THRESHOLDS = {
	minor: 0,
	moderate: 15,
	major: 60,
	critical: 180,
};

// Delay categories
export const DELAY_CATEGORIES = {
	technical: "Technical Issue",
	weather: "Weather Conditions",
	crew: "Crew Issues",
	air_traffic: "Air Traffic Control",
	passenger_handling: "Passenger Handling",
	security: "Security",
	mechanical: "Mechanical",
	other: "Other",
};

// RabbitMQ queue configuration
export const RABBITMQ_CONFIG = {
	reporting_queue: process.env.REPORTING_QUEUE_NAME || "analytics_export_queue",
	notification_queue:
		process.env.NOTIFICATION_QUEUE_NAME || "flight_status_notifications",
	prefetch_count: 1,
	durable: true,
	persistent: true,
};

// CSV export configuration
export const CSV_EXPORT_CONFIG = {
	fields: [
		"date",
		"origin_airport",
		"destination_airport",
		"aircraft_id",
		"total_flights",
		"delayed_flights",
		"avg_delay_minutes",
		"total_flight_hours",
		"avg_load_factor_pct",
		"avg_fuel_efficiency",
	],
	export_dir: "exports",
	file_prefix: "analytics_report",
};

// Analytics error messages
export const ANALYTICS_MESSAGES = {
	NO_DATA_AVAILABLE: "No analytics data available for the specified filters",
	INVALID_DATE_RANGE: "Invalid date range: end date must be after start date",
	INVALID_TIME_FILTER:
		"Invalid time filter. Must be one of: last_hour, daily, weekly, monthly, yearly",
	EXPORT_INITIATED: "Export report initiated. Check status with export ID.",
	EXPORT_ALREADY_PROCESSING: "An export with this ID is already processing",
	EXPORT_GENERATION_FAILED: "Failed to generate export report",
	ACTIVE_FLIGHTS_RETRIEVED: "Active flights retrieved successfully",
	COUNTERS_RETRIEVED: "Dashboard counters retrieved successfully",
	PERFORMANCE_DATA_RETRIEVED: "Performance data retrieved successfully",
};

// Metrics calculation constants
export const METRICS = {
	on_time_threshold_minutes: 15,
	fuel_efficiency_threshold: 3.5,
	load_factor_threshold_pct: 80,
};
