"use client";

import { Pie, PieChart, Cell, Legend } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardAction,
	CardFooter,
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
import { TrendingUp } from "lucide-react";
import type { DelayAnalysisChartProps } from "@/props/delay-analysis-props";
import type { EnrichedDelayAnalysisItem } from "@/types/delay-analysis-types";
import {
	renderCustomLabel,
	legendFormatter,
} from "@/utils/charts/chart-formatter";

export function DelayAnalysisChart({
	data,
	chartConfig,
	loading,
	topCategory,
	timeFilter,
	timeLabels,
	onFilterChange,
	tooltipFormatter,
}: DelayAnalysisChartProps) {
	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<div className="flex w-full items-center justify-between">
					<div className="flex flex-col gap-1">
						<CardTitle>Delay Analysis</CardTitle>
						<CardDescription>
							<span className="hidden @[540px]:block">
								Breakdown of delays by category for {timeLabels.long}
							</span>
							<span className="@[540px]:hidden">{timeLabels.short}</span>
						</CardDescription>
					</div>
					<CardAction>
						<Select
							value={timeFilter}
							onValueChange={onFilterChange}
						>
							<SelectTrigger className="w-32">
								<SelectValue />
							</SelectTrigger>
							<SelectContent className="rounded-xl">
								<SelectItem
									value="weekly"
									className="rounded-lg"
								>
									Weekly
								</SelectItem>
								<SelectItem
									value="monthly"
									className="rounded-lg"
								>
									Monthly
								</SelectItem>
								<SelectItem
									value="yearly"
									className="rounded-lg"
								>
									Yearly
								</SelectItem>
							</SelectContent>
						</Select>
					</CardAction>
				</div>
			</CardHeader>

			<CardContent className="flex-1 pb-0">
				{loading ? (
					<div className="flex items-center justify-center h-64 text-muted-foreground">
						Loading chart data...
					</div>
				) : data.length === 0 ? (
					<div className="flex items-center justify-center h-64 text-muted-foreground">
						No delay data available
					</div>
				) : (
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-70"
					>
						<PieChart>
							<ChartTooltip
								cursor={false}
								content={
									<ChartTooltipContent
										formatter={tooltipFormatter}
										hideLabel
									/>
								}
							/>
							<Pie
								data={data}
								dataKey="count"
								nameKey="category"
								cx="50%"
								cy="50%"
								outerRadius={100}
								labelLine={false}
								label={renderCustomLabel}
							>
								{data.map((entry: EnrichedDelayAnalysisItem, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.fill}
										stroke="hsl(var(--background))"
										strokeWidth={2}
									/>
								))}
							</Pie>

							<Legend
								layout="horizontal"
								verticalAlign="bottom"
								align="center"
								iconType="circle"
								iconSize={8}
								formatter={legendFormatter}
							/>
						</PieChart>
					</ChartContainer>
				)}
			</CardContent>

			<CardFooter className="flex-col gap-2 text-sm">
				{topCategory && (
					<div className="flex items-center gap-2 leading-none font-medium">
						<span
							className="inline-block h-2 w-2 rounded-full"
							style={{ backgroundColor: topCategory.fill }}
						/>
						Top cause: {topCategory.category} (
						{topCategory.percentage.toFixed(1)}%)
						<TrendingUp className="h-4 w-4" />
					</div>
				)}
				<div className="leading-none text-muted-foreground">
					Showing delay breakdown for selected period
				</div>
			</CardFooter>
		</Card>
	);
}
