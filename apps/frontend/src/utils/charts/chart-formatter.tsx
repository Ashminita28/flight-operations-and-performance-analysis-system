import type { ReactNode } from "react";
import type {
	ValueType,
	NameType,
} from "recharts/types/component/DefaultTooltipContent";

import { RADIAN } from "../../constants/delay-analysis-constans";
import type { EnrichedDelayAnalysisItem } from "../../types/delay-analysis-types";
import type { CustomLabelProps } from "@/props/custom-label-props";

// CUSTOM LABELS
export function renderCustomLabel({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percentage,
	category,
}: CustomLabelProps): ReactNode {
	if (percentage < 5) return null;

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
				{percentage.toFixed(1)}%
			</tspan>
		</text>
	);
}

//TOOLTIP FORMATTER

export function createTooltipFormatter(data: EnrichedDelayAnalysisItem[]) {
	return (value: ValueType, name: NameType): ReactNode => {
		const item = data.find(d => d.category === name);

		const percentage = item?.percentage ?? 0;

		return (
			<div className="flex flex-col gap-0.5">
				<span className="font-medium">{String(name)}</span>
				<span>
					{value} incidents · {percentage.toFixed(1)}%
				</span>
			</div>
		);
	};
}

// LEGEND FORMATTER

export function legendFormatter(value: string): ReactNode {
	return <span className="text-xs text-foreground">{value}</span>;
}
