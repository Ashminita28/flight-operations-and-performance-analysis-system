import type { FlightStatus } from "@/types/flight-types";

export const STATUS_COLORS: Record<FlightStatus, string> = {
	scheduled: "bg-blue-100 text-blue-700",
	boarding: "bg-yellow-100 text-yellow-700",
	departed: "bg-sky-100 text-sky-700",
	landed: "bg-green-100 text-green-700",
	diverted: "bg-purple-100 text-purple-700",
	cancelled: "bg-red-100 text-red-700",
	delayed: "bg-orange-100 text-orange-700",
};

export const SEVERITY_COLORS: Record<string, string> = {
	low: "bg-gray-100 text-gray-600",
	medium: "bg-yellow-100 text-yellow-700",
	high: "bg-orange-100 text-orange-700",
	critical: "bg-red-100 text-red-700",
};

export const STATUS_BADGE: Record<FlightStatus, string> = {
	scheduled: "bg-blue-100   text-blue-800   border-blue-200",
	boarding: "bg-amber-100  text-amber-800  border-amber-200",
	departed: "bg-sky-100    text-sky-800    border-sky-200",
	landed: "bg-green-100  text-green-800  border-green-200",
	diverted: "bg-purple-100 text-purple-800 border-purple-200",
	cancelled: "bg-red-100    text-red-800    border-red-200",
	delayed: "bg-orange-100 text-orange-800 border-orange-200",
};
