"use client";
import { memo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { OnTimePerformanceChartProps } from "@/props/performance-props";
import { formatDate, formatTooltipValue } from "@/utils/charts/date-formatter";

export const OnTimePerformanceChart = memo(function OnTimePerformanceChart({
	data,
	loading,
	timeFilter,
	timeLabels,
	chartConfig,
	onFilterChange,
}: OnTimePerformanceChartProps) {
	return (
		<Card className="@container/card border border-gray-200 shadow-sm">
			<CardHeader>
				<CardTitle className="text-base font-semibold text-gray-900">
					On-Time Performance
				</CardTitle>
				<CardDescription className="text-sm text-gray-500">
					<span className="hidden @[540px]/card:block">
						Flight performance trends for {timeLabels.long}
					</span>
					<span className="@[540px]/card:hidden">{timeLabels.short}</span>
				</CardDescription>
				<CardAction>
					<ToggleGroup
						type="single"
						value={timeFilter}
						onValueChange={onFilterChange}
						variant="outline"
						aria-label="Select time range"
						className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
					>
						<ToggleGroupItem
							value="weekly"
							className="text-sm"
						>
							Last Week
						</ToggleGroupItem>
						<ToggleGroupItem
							value="monthly"
							className="text-sm"
						>
							Last Month
						</ToggleGroupItem>
						<ToggleGroupItem
							value="yearly"
							className="text-sm"
						>
							Last Year
						</ToggleGroupItem>
					</ToggleGroup>

					<Select
						value={timeFilter}
						onValueChange={onFilterChange}
					>
						<SelectTrigger
							className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden border-gray-200 text-sm"
							size="sm"
							aria-label="Select a time range"
						>
							<SelectValue placeholder="Last month" />
						</SelectTrigger>
						<SelectContent className="rounded-lg">
							<SelectItem
								value="weekly"
								className="rounded-md text-sm"
							>
								Last Week
							</SelectItem>
							<SelectItem
								value="monthly"
								className="rounded-md text-sm"
							>
								Last Month
							</SelectItem>
							<SelectItem
								value="yearly"
								className="rounded-md text-sm"
							>
								Last Year
							</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>

			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				{loading ? (
					<div
						role="status"
						aria-label="Loading chart data"
						className="flex items-center justify-center h-62.5 text-sm text-gray-400"
					>
						Loading chart data...
					</div>
				) : !data || data.length === 0 ? (
					<div className="flex items-center justify-center h-62.5 text-sm text-gray-400">
						No performance data available
					</div>
				) : (
					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-62.5 w-full"
					>
						<AreaChart data={data}>
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
										stopOpacity={0.2}
									/>
									<stop
										offset="95%"
										stopColor="var(--color-on_time_percentage)"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid
								vertical={false}
								stroke="#f0f0f0"
							/>
							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={formatDate}
								tick={{ fontSize: 12, fill: "#9ca3af" }}
							/>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										labelFormatter={formatDate}
										indicator="dot"
										formatter={formatTooltipValue}
									/>
								}
							/>
							<Area
								dataKey="on_time_percentage"
								type="natural"
								fill="url(#fillPerformance)"
								stroke="var(--color-on_time_percentage)"
								strokeWidth={2}
								name="On-Time %"
							/>
						</AreaChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	);
});
