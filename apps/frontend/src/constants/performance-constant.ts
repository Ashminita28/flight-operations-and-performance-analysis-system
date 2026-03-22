import type {
	OnTimeChartConfig,
	TimeLabel,
	ChartTimeFilter,
} from "../types/performance-types";

export const ON_TIME_CHART_CONFIG: OnTimeChartConfig = {
	on_time_percentage: {
		label: "On-Time Performance",
		color: "var(--primary)",
	},
	total_flights: {
		label: "Total Flights",
		color: "var(--primary)",
	},
};

export const TIME_FILTER_LABELS: Record<ChartTimeFilter, TimeLabel> = {
	weekly: { long: "the last week", short: "Last week" },
	monthly: { long: "the last month", short: "Last month" },
	yearly: { long: "the last year", short: "Last year" },
};

export const LOCALE_OPTS: Intl.DateTimeFormatOptions = {
	month: "short",
	day: "numeric",
};
