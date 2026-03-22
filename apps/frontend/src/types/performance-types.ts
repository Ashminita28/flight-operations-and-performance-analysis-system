import type { ChartConfig } from "@/components/ui/chart";

export type ChartTimeFilter = "weekly" | "monthly" | "yearly";

export interface OnTimePerformanceItem {
	date: string;
	on_time_percentage: number;
	total_flights: number;
}

export type OnTimeChartConfig = ChartConfig;

export interface TimeLabel {
	long: string;
	short: string;
}
