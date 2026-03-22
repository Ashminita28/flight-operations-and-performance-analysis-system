export interface PerformanceProps {
	open: boolean;
	onClose: () => void;
	flightId: string;
}

export interface FormErrors {
	fuel_used_kg?: string;
	distance_km?: string;
	flight_time_minutes?: string;
	passengers_count?: string;
	payload_kg?: string;
}
