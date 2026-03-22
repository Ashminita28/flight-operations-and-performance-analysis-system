import { CHART_COLORS } from "../../constants/delay-analysis-constant";
import type {
	DelayAnalysisItem,
	EnrichedDelayAnalysisItem,
} from "../../types/delay-analysis-types";

export function enrichDelayData(
	data: DelayAnalysisItem[],
): EnrichedDelayAnalysisItem[] {
	return data.map((item, index) => ({
		...item,
		fill: CHART_COLORS[index % CHART_COLORS.length],
		percentage: Number(item.percentage),
		count: Number(item.count),
	}));
}

export function getTopCategory(data: EnrichedDelayAnalysisItem[]) {
	return data.reduce<EnrichedDelayAnalysisItem | undefined>(
		(max, item) => (item.percentage > (max?.percentage ?? 0) ? item : max),
		undefined,
	);
}
