"use client";

import { useRef, Suspense, lazy } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconDownload } from "@tabler/icons-react";
import type { ChartTimeFilter } from "@/types/analytics-types";
import { ExportReportFormContainer } from "@/containers/export-report-container";
import { AnalyticsCountersContainer } from "@/containers/analytics-counter-container";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useAnalyticsStore } from "@/store/analytics-store";
const DelayAnalysisChartContainer = lazy(
	() => import("@/containers/delay-analysis-chart-container"),
);

const OnTimePerformanceChartContainer = lazy(
	() => import("@/containers/performance-container"),
);

const ActiveFlightsTable = lazy(
	() => import("../components/active-flights-table"),
);

export default function MainDashboard() {
	const timeFilter: ChartTimeFilter = "monthly";
	const {
		filters,
		fetchCounters,
		fetchOnTimePerformance,
		fetchDelayAnalysis,
		fetchActiveFlights,
	} = useAnalyticsStore();

	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;
		hasFetched.current = true;

		const timeFilter = "monthly";

		fetchCounters({ ...filters, time_filter: timeFilter });
		fetchOnTimePerformance(timeFilter);
		fetchDelayAnalysis(timeFilter);
		fetchActiveFlights(filters);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className="flex flex-col gap-6 py-4 px-4 md:py-6 md:px-6">
				{/* Page Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h2 className="text-xl font-semibold text-gray-900">
							Analytics &amp; Reports
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Monitor flight operations and generate analytics reports
						</p>
					</div>

					<Dialog>
						<DialogTrigger asChild>
							<Button
								className="bg-sky-950 hover:bg-sky-900 text-white gap-2 self-start sm:self-auto"
								aria-label="Open export report dialog"
							>
								<IconDownload
									className="w-4 h-4"
									aria-hidden="true"
								/>
								Export Report
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-md border border-gray-200 shadow-md">
							<DialogHeader>
								<DialogTitle className="text-lg font-semibold text-gray-900">
									Export Analytics Report
								</DialogTitle>
								<DialogDescription className="text-sm text-gray-500">
									Generate a CSV report and have it sent to your email
								</DialogDescription>
							</DialogHeader>
							<ExportReportFormContainer />
						</DialogContent>
					</Dialog>
				</div>

				<Separator className="bg-gray-100" />

				{/* Counters */}
				<section aria-label="Analytics counters">
					<AnalyticsCountersContainer timeFilter={timeFilter} />
				</section>

				{/* Charts */}
				<section aria-label="Analytics charts">
					<div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
						<Suspense
							fallback={
								<div className="h-80 rounded-xl border border-gray-200 bg-white animate-pulse" />
							}
						>
							<OnTimePerformanceChartContainer />
						</Suspense>
						<Suspense
							fallback={
								<div className="h-80 rounded-xl border border-gray-200 bg-white animate-pulse" />
							}
						>
							<DelayAnalysisChartContainer />
						</Suspense>
					</div>
				</section>

				{/* Active Flights */}
				<section aria-label="Active flights table">
					<Suspense
						fallback={
							<div className="h-40 rounded-xl border border-gray-200 bg-white animate-pulse" />
						}
					>
						<ActiveFlightsTable />
					</Suspense>
				</section>
			</div>
		</>
	);
}
