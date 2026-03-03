export const EVENT_TYPES = [
	"delay",
	"diversion",
	"cancellation",
	"gate_change",
	"crew_issue",
	"technical_issue",
	"weather",
	"fuel_issue",
	"other",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];
