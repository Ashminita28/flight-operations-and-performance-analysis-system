"use client";

import { useEffect } from "react";
import { Pie, PieChart, Cell, Legend } from "recharts";
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

const CHART_COLORS = [
	"hsl(221, 83%, 53%)",
	"hsl(142, 71%, 45%)",
	"hsl(346, 87%, 57%)",
	"hsl(38,  92%, 50%)",
	"hsl(262, 83%, 58%)",
	"hsl(199, 89%, 48%)",
	"hsl(24,  95%, 53%)",
	"hsl(316, 73%, 52%)",
];

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

	const enrichedData = (delayAnalysisData || []).map((item, index) => ({
		...item,
		fill: CHART_COLORS[index % CHART_COLORS.length],

		percentage: Number(item.percentage),
		count: Number(item.count),
	}));

	//chartConfig so ChartTooltip can display the label + color swatch
	const chartConfig: ChartConfig = {
		count: { label: "Incidents" },
		...Object.fromEntries(
			enrichedData.map(item => [
				item.category,
				{
					label: item.category,
					color: item.fill,
				},
			]),
		),
	};

	// Find the top delay category for the footer callout
	const topCategory = enrichedData.reduce(
		(max, item) => (item.percentage > (max?.percentage ?? 0) ? item : max),
		enrichedData[0],
	);

	const handleFilterChange = (value: string) => {
		setChartTimeFilter(value as any);
	};

	const renderCustomLabel = ({
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		percentage,
		category,
	}: any) => {
		// Skipping tiny slices — label would overlap
		if (percentage < 5) return null;

		const RADIAN = Math.PI / 180;
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);

		return (
			<text
				x={x}
				y={y}
				fill="white"
				textAnchor="middle"
				dominantBaseline="central"
				fontSize={11}
				fontWeight={600}
			>
				<tspan
					x={x}
					dy="-0.4em"
				>
					{category}
				</tspan>
				<tspan
					x={x}
					dy="1.2em"
				>
					{Number(percentage).toFixed(1)}%
				</tspan>
			</text>
		);
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
				) : enrichedData.length === 0 ? (
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
										// Display both count and percentage in tooltip
										formatter={(value, name) => (
											<div className="flex flex-col gap-0.5">
												<span className="font-medium">{name}</span>
												<span>
													{value} incidents&nbsp;·&nbsp;
													{enrichedData
														.find(d => d.category === name)
														?.percentage.toFixed(1)}
													%
												</span>
											</div>
										)}
										hideLabel
									/>
								}
							/>
							<Pie
								data={enrichedData}
								dataKey="count"
								nameKey="category"
								cx="50%"
								cy="50%"
								outerRadius={100}
								labelLine={false}
								label={renderCustomLabel}
							>
								{/* Cell gives each slice its own fill color */}
								{enrichedData.map((entry, index) => (
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
								formatter={value => (
									<span className="text-xs text-foreground">{value}</span>
								)}
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
