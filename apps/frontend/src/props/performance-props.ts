import type {
	OnTimePerformanceItem,
	ChartTimeFilter,
	TimeLabel,
} from "../types/performance-types";
import type { ChartConfig } from "@/components/ui/chart";

export interface OnTimePerformanceChartProps {
	data: OnTimePerformanceItem[];
	loading: boolean;
	timeFilter: ChartTimeFilter;
	timeLabels: TimeLabel;
	chartConfig: ChartConfig;
	onFilterChange: (value: string) => void;
}
