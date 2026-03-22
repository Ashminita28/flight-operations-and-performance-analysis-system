import type { FlightStatus } from "@/types/flight-types";

export const STATUS_OPTIONS: { value: FlightStatus; label: string }[] = [
	{ value: "scheduled", label: "Scheduled" },
	{ value: "boarding", label: "Boarding" },
	{ value: "departed", label: "Departed" },
	{ value: "landed", label: "Landed" },
	{ value: "diverted", label: "Diverted" },
	{ value: "cancelled", label: "Cancelled" },
	{ value: "delayed", label: "Delayed" },
];
