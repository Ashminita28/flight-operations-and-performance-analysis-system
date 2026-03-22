import type {
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { EnrichedDelayAnalysisItem } from "../types/delay-analysis-types";
import type { ChartConfig } from "@/components/ui/chart";

export interface DelayAnalysisChartProps {
	data: EnrichedDelayAnalysisItem[];
	chartConfig: ChartConfig;
	loading: boolean;
	topCategory?: EnrichedDelayAnalysisItem;
	timeFilter: string;
	timeLabels: { long: string; short: string };
	onFilterChange: (value: string) => void;
	tooltipFormatter: (value: ValueType, name: NameType) => React.ReactNode;
}
