import type { FlightStatus } from "../types/flight-types";

export interface StatusProps {
	open: boolean;
	onClose: () => void;
	flightId: string;
	currentStatus: FlightStatus;
}
