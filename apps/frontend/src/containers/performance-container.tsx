"use client";

import { useCallback } from "react";
import { useAnalyticsStore } from "@/store/analytics-store";

import { OnTimePerformanceChart } from "@/components/on-time-performance-chart";

import {
	TIME_FILTER_LABELS,
	ON_TIME_CHART_CONFIG,
} from "../constants/performance-constant";

import type { ChartTimeFilter } from "../types/performance-types";

export default function OnTimePerformanceChartContainer() {
	const {
		onTimePerformanceData,
		chartTimeFilter,
		performanceLoading,
		setChartTimeFilter,
	} = useAnalyticsStore();

	const handleFilterChange = useCallback(
		(value: string) => {
			setChartTimeFilter(value as ChartTimeFilter);
		},
		[setChartTimeFilter],
	);

	const timeLabels =
		TIME_FILTER_LABELS[chartTimeFilter] ?? TIME_FILTER_LABELS.yearly;

	return (
		<OnTimePerformanceChart
			data={onTimePerformanceData ?? []}
			loading={performanceLoading}
			timeFilter={chartTimeFilter}
			timeLabels={timeLabels}
			chartConfig={ON_TIME_CHART_CONFIG}
			onFilterChange={handleFilterChange}
		/>
	);
}
