import type { DashboardCounters } from "../types/analytics-types";
import type { ChartTimeFilter } from "@/types/analytics-types";

export interface AnalyticsCountersProps {
	data: DashboardCounters | null;
	loading: boolean;
	timeFilter: ChartTimeFilter;
}
