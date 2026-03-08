export type FlightStatus =
	| "scheduled"
	| "boarding"
	| "departed"
	| "landed"
	| "diverted"
	| "cancelled"
	| "delayed";

export const INVALID_TRANSITIONS: Record<FlightStatus, FlightStatus[]> = {
	scheduled: ["departed", "landed", "diverted", "cancelled"],
	boarding: ["scheduled", "landed", "cancelled"],
	departed: ["scheduled", "boarding", "cancelled"],
	landed: ["scheduled", "boarding", "departed", "cancelled", "delayed"],
	diverted: ["scheduled", "boarding", "departed", "landed", "cancelled"],
	cancelled: ["scheduled", "boarding", "departed", "landed", "delayed"],
	delayed: [],
};

export const EVENT_TO_STATUS: Record<string, FlightStatus> = {
	Scheduled: "scheduled",
	Boarding: "boarding",
	Departed: "departed",
	Landed: "landed",
	Diverted: "diverted",
	Cancelled: "cancelled",
	Delayed: "delayed",
};
