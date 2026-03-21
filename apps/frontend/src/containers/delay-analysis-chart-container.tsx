import { useEffect, useMemo, useCallback } from "react";
import { useAnalyticsStore } from "@/store/analytics-store";
import { DelayAnalysisChart } from "../components/delay-analysis-chart";

import {
	enrichDelayData,
	getTopCategory,
} from "../utils/charts/chart-transform";
import { createTooltipFormatter } from "../utils/charts/chart-formatter";
import { TIME_FILTER_LABELS } from "../constants/delay-analysis-constans";
import type { ChartTimeFilter } from "@/types/analytics-types";

export function DelayAnalysisChartContainer() {
	const {
		delayAnalysisData,
		chartTimeFilter,
		loading,
		fetchDelayAnalysis,
		setChartTimeFilter,
	} = useAnalyticsStore();

	useEffect(() => {
		fetchDelayAnalysis(chartTimeFilter);
	}, [chartTimeFilter, fetchDelayAnalysis]);

	const enrichedData = useMemo(
		() => enrichDelayData(delayAnalysisData ?? []),
		[delayAnalysisData],
	);

	const topCategory = useMemo(
		() => getTopCategory(enrichedData),
		[enrichedData],
	);

	const tooltipFormatter = useMemo(
		() => createTooltipFormatter(enrichedData),
		[enrichedData],
	);

	const handleFilterChange = useCallback(
		(value: string) => setChartTimeFilter(value as ChartTimeFilter),
		[setChartTimeFilter],
	);

	const timeLabels =
		TIME_FILTER_LABELS[chartTimeFilter] ?? TIME_FILTER_LABELS.yearly;

	const chartConfig = useMemo(
		() => ({
			count: { label: "Incidents" },
			...Object.fromEntries(
				enrichedData.map(item => [
					item.category,
					{ label: item.category, color: item.fill },
				]),
			),
		}),
		[enrichedData],
	);

	return (
		<DelayAnalysisChart
			data={enrichedData}
			chartConfig={chartConfig}
			loading={loading}
			topCategory={topCategory}
			timeFilter={chartTimeFilter}
			timeLabels={timeLabels}
			onFilterChange={handleFilterChange}
			tooltipFormatter={tooltipFormatter}
		/>
	);
}
