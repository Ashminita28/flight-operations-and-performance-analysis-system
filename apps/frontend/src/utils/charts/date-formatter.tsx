import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { LOCALE_OPTS } from "../../constants/performance-constant";

export function formatDate(value: string): string {
	return new Date(value).toLocaleDateString("en-US", LOCALE_OPTS);
}

export function formatTooltipValue(value: ValueType): string {
	return `${Number(value).toFixed(2)}%`;
}
