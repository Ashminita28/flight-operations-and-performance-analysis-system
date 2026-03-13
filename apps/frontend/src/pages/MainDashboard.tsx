"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AnalyticsCounters } from "@/components/analytics-counters";
import { OnTimePerformanceChart } from "@/components/on-time-performance-chart";
import { DelayAnalysisChart } from "@/components/delay-analysis-chart";
import { ActiveFlightsTable } from "@/components/active-flights-table";
import { ExportReportForm } from "@/components/export-report-form";
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

export default function MainDashboard() {
	const [timeFilter] = useState("daily");

	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							{/* Header with Export Button */}
							<div className="px-4 lg:px-6 flex items-center justify-between">
								<div>
									<h2 className="text-3xl font-bold tracking-tight">
										Analytics & Reports
									</h2>
									<p className="text-muted-foreground mt-1">
										Monitor flight operations and generate analytics reports
									</p>
								</div>
								<Dialog>
									<DialogTrigger asChild>
										<Button className="gap-2 bg-sky-950 hover:bg-sky-900">
											<IconDownload className="w-4 h-4" />
											Export Report
										</Button>
									</DialogTrigger>
									<DialogContent className="max-w-md">
										<DialogHeader>
											<DialogTitle>Export Analytics Report</DialogTitle>
											<DialogDescription>
												Generate a CSV report and have it sent to your email
											</DialogDescription>
										</DialogHeader>
										<ExportReportForm />
									</DialogContent>
								</Dialog>
							</div>

							{/* Dashboard Counters */}
							<div>
								<AnalyticsCounters onTimeFilter={timeFilter} />
							</div>

							{/* Charts Section */}
							<div className="px-4 lg:px-6">
								<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
									<OnTimePerformanceChart />
									<DelayAnalysisChart />
								</div>
							</div>

							{/* Active Flights Table */}
							<div className="px-4 lg:px-6">
								<ActiveFlightsTable />
							</div>
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
