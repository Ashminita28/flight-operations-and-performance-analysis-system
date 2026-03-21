"use client";
import {
	Card,
	CardFooter,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import type { AnalyticsCountersProps } from "@/props/analytics-counter-props";

export function AnalyticsCounters({ data, loading }: AnalyticsCountersProps) {
	if (loading) {
		return (
			<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
				{[...Array(4)].map((_, i) => (
					<Card
						key={i}
						className="@container/card animate-pulse"
					>
						<CardHeader>
							<div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
							<div className="h-8 bg-gray-200 rounded w-16"></div>
						</CardHeader>
					</Card>
				))}
			</div>
		);
	}

	if (!data) {
		return (
			<div className="px-4 lg:px-6 text-center text-muted-foreground">
				No analytics data available
			</div>
		);
	}

	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			{/* Total Flights */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Flights</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{data.total_flights || 0}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="text-green-700 border-green-200"
						>
							<IconTrendingUp className="w-4 h-4 mr-1" />
							Currently tracking
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						All flights in system <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Total flight operations</div>
				</CardFooter>
			</Card>

			{/* Active Flights */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Active Flights</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{data.active_flights || 0}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="text-blue-700 border-blue-200"
						>
							<IconTrendingUp className="w-4 h-4 mr-1" />
							In Progress
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Scheduled, boarding, or departed{" "}
						<IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Flights currently active</div>
				</CardFooter>
			</Card>

			{/* On-Time Flights */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>On-Time Flights</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{data.on_time_flights || 0}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="text-emerald-700 border-emerald-200"
						>
							<IconTrendingUp className="w-4 h-4 mr-1" />
							{data.on_time_performance_pct?.toFixed(1) || 0}%
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Excellent performance <IconTrendingUp className="size-4" />
					</div>
					<div className="text-muted-foreground">Flights landed on time</div>
				</CardFooter>
			</Card>

			{/* Delayed Flights */}
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Delayed Flights</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{data.delayed_flights || 0}
					</CardTitle>
					<CardAction>
						<Badge
							variant="outline"
							className="text-red-700 border-red-200"
						>
							<IconTrendingDown className="w-4 h-4 mr-1" />
							Needs attention
						</Badge>
					</CardAction>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Monitor delays <IconTrendingDown className="size-4" />
					</div>
					<div className="text-muted-foreground">
						Flights delayed or cancelled
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
