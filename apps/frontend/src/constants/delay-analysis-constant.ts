export const CHART_COLORS = [
	"hsl(221, 83%, 53%)",
	"hsl(142, 71%, 45%)",
	"hsl(346, 87%, 57%)",
	"hsl(38,  92%, 50%)",
	"hsl(262, 83%, 58%)",
	"hsl(199, 89%, 48%)",
	"hsl(24,  95%, 53%)",
	"hsl(316, 73%, 52%)",
];

export const TIME_FILTER_LABELS: Record<
	string,
	{ long: string; short: string }
> = {
	weekly: { long: "this week", short: "This week" },
	monthly: { long: "this month", short: "This month" },
	yearly: { long: "this year", short: "This year" },
};

export const RADIAN = Math.PI / 180;
