"use client";

import { useEffect } from "react";
import { Pie, PieChart } from "recharts";
import { useAnalyticsStore } from "@/store/analytics-store";
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
	type ChartConfig,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TrendingUp } from "lucide-react";

export function DelayAnalysisChart() {
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

	// dynamic chart generation config from data
	const chartConfig: ChartConfig = {
		count: {
			label: "Delays",
		},
		...Object.fromEntries(
			(delayAnalysisData || []).map((item, index) => [
				item.category.toLowerCase().replace(/\s+/g, "_"),
				{
					label: item.category,
					color: `hsl(${(index * 360) / (delayAnalysisData?.length || 1)}, 70%, 60%)`,
				},
			]),
		),
	};

	const handleFilterChange = (value: string) => {
		setChartTimeFilter(value as any);
	};

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<div className="flex w-full items-center justify-between">
					<div className="flex flex-col gap-1">
						<CardTitle>Delay Analysis</CardTitle>
						<CardDescription>
							<span className="hidden @[540px]:block">
								Breakdown of delays by category for{" "}
								{chartTimeFilter === "weekly"
									? "this week"
									: chartTimeFilter === "monthly"
										? "this month"
										: "this year"}
							</span>
							<span className="@[540px]:hidden">
								{chartTimeFilter === "weekly"
									? "This week"
									: chartTimeFilter === "monthly"
										? "This month"
										: "This year"}
							</span>
						</CardDescription>
					</div>
					<CardAction>
						<Select
							value={chartTimeFilter}
							onValueChange={handleFilterChange}
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
				) : !delayAnalysisData || delayAnalysisData.length === 0 ? (
					<div className="flex items-center justify-center h-64 text-muted-foreground">
						No delay data available
					</div>
				) : (
					<ChartContainer
						config={chartConfig}
						className="mx-auto aspect-square max-h-62.5"
					>
						<PieChart>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent hideLabel />}
							/>
							<Pie
								data={delayAnalysisData}
								dataKey="count"
								nameKey="category"
								cx="50%"
								cy="50%"
								outerRadius={80}
								label={({ category, percentage }) =>
									`${category}: ${percentage.toFixed(0)}%`
								}
							/>
						</PieChart>
					</ChartContainer>
				)}
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 leading-none font-medium">
					Delay categories tracked <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing delay breakdown for selected period
				</div>
			</CardFooter>
		</Card>
	);
}
