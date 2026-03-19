"use client";

import { useState, useCallback } from "react";
import { AnalyticsHeader } from "./analytics-header";

import { AnalyticsCounters } from "./analytics-counters";
import { OnTimePerformanceChart } from "./on-time-performance-chart";
import { DelayAnalysisChart } from "./delay-analysis-chart";
import { ActiveFlightsTable } from "./active-flights-table";

export function AnalyticsDashboard() {
	const [timeFilter] = useState<"daily" | "weekly" | "monthly">("daily");

	const getTimeFilter = useCallback(() => timeFilter, [timeFilter]);

	return (
		<div className="flex flex-1 flex-col gap-6 py-6">
			<AnalyticsHeader />
			<div>
				<AnalyticsCounters onTimeFilter={getTimeFilter()} />
			</div>
			<div className="px-4 lg:px-6">
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<OnTimePerformanceChart />
					<DelayAnalysisChart />
				</div>
			</div>
			<div className="px-4 lg:px-6">
				<ActiveFlightsTable />
			</div>
		</div>
	);
}
