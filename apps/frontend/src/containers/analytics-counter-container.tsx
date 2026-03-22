"use client";

import { useAnalyticsStore } from "@/store/analytics-store";
import { AnalyticsCounters } from "../components/analytics-counters";
import type { ChartTimeFilter } from "@/types/analytics-types";

const DEFAULT_FILTER: ChartTimeFilter = "weekly";

export function AnalyticsCountersContainer({
	timeFilter = DEFAULT_FILTER,
}: {
	timeFilter?: ChartTimeFilter;
}) {
	const counters = useAnalyticsStore(s => s.counters);
	const loading = useAnalyticsStore(s => s.countersLoading);

	return (
		<AnalyticsCounters
			data={counters}
			loading={loading}
			timeFilter={timeFilter}
		/>
	);
}
