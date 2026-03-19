"use client";

import { useCallback, useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useAnalyticsStore } from "@/store/analytics-store";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ChartTimeFilter } from "@/types/analytics-types";

const chartConfig = {
	on_time_percentage: {
		label: "On-Time Performance",
		color: "var(--primary)",
	},
	total_flights: {
		label: "Total Flights",
		color: "var(--primary)",
	},
} satisfies ChartConfig;

export function OnTimePerformanceChart() {
	const {
		onTimePerformanceData,
		chartTimeFilter,
		loading,
		fetchOnTimePerformance,
		setChartTimeFilter,
	} = useAnalyticsStore();

	useEffect(() => {
		fetchOnTimePerformance(chartTimeFilter);
	}, [chartTimeFilter, fetchOnTimePerformance]);

	const handleFilterChange = useCallback(
		(value: ChartTimeFilter) => {
			setChartTimeFilter(value);
		},
		[setChartTimeFilter],
	);

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>On-Time Performance</CardTitle>
				<CardDescription>
					<span className="hidden @[540px]/card:block">
						Flight performance trends for{" "}
						{chartTimeFilter === "weekly"
							? "the last week"
							: chartTimeFilter === "monthly"
								? "the last month"
								: "the last year"}
					</span>
					<span className="@[540px]/card:hidden">
						{chartTimeFilter === "weekly"
							? "Last week"
							: chartTimeFilter === "monthly"
								? "Last month"
								: "Last year"}
					</span>
				</CardDescription>
				<CardAction>
					<ToggleGroup
						type="single"
						value={chartTimeFilter}
						onValueChange={handleFilterChange}
						variant="outline"
						className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
					>
						<ToggleGroupItem value="weekly">Last Week</ToggleGroupItem>
						<ToggleGroupItem value="monthly">Last Month</ToggleGroupItem>
						<ToggleGroupItem value="yearly">Last Year</ToggleGroupItem>
					</ToggleGroup>
					<Select
						value={chartTimeFilter}
						onValueChange={handleFilterChange}
					>
						<SelectTrigger
							className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
							size="sm"
							aria-label="Select a value"
						>
							<SelectValue placeholder="Last month" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem
								value="weekly"
								className="rounded-lg"
							>
								Last Week
							</SelectItem>
							<SelectItem
								value="monthly"
								className="rounded-lg"
							>
								Last Month
							</SelectItem>
							<SelectItem
								value="yearly"
								className="rounded-lg"
							>
								Last Year
							</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				{loading ? (
					<div className="flex items-center justify-center h-62.5 text-muted-foreground">
						Loading chart data...
					</div>
				) : !onTimePerformanceData || onTimePerformanceData.length === 0 ? (
					<div className="flex items-center justify-center h-62.5 text-muted-foreground">
						No performance data available
					</div>
				) : (
					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-62.5 w-full"
					>
						<AreaChart data={onTimePerformanceData}>
							<defs>
								<linearGradient
									id="fillPerformance"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="var(--color-on_time_percentage)"
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-on_time_percentage)"
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={value => {
									const date = new Date(value);
									return date.toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
									});
								}}
							/>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={value => {
											return new Date(value).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											});
										}}
										indicator="dot"
										formatter={value => {
											const num = Number(value);
											return `${num.toFixed(2)}%`;
										}}
									/>
								}
							/>
							<Area
								dataKey="on_time_percentage"
								type="natural"
								fill="url(#fillPerformance)"
								stroke="var(--color-on_time_percentage)"
								name="On-Time %"
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
}
