export interface DelayAnalysisItem {
	category: string;
	count: number;
	percentage: number;
}

export interface EnrichedDelayAnalysisItem extends DelayAnalysisItem {
	fill: string;
}
