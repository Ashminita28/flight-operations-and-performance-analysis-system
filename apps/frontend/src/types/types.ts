export interface Performance {
	id: string;
	flight_id: string;
	fuel_planned_kg: number;
	fuel_used_kg: number;
	fuel_remaining_kg: number;
	fuel_efficiency_kg_per_km: number;
	block_time_minutes: number;
	flight_time_minutes: number;
	distance_km: number;
	passengers_count: number;
	cargo_weight_kg: number;
	payload_kg: number;
	load_factor_pct: number;
	co2_emissions_kg: number;
}

export interface OperationalEvent {
	id: string;
	flight_id: string;
	event_type: string;
	delay_category_id: string;
	delay_minutes: string;
	description: string;
	event_time: Date;
	resolved_at: Date;
	severity: string;
	createdAt: string;
}

export interface DelayCategory {
	id: string;
	code: string;
	name: string;
	iata_code: string;
	description: string;
	is_controllable: boolean;
}

export type FlightStatus =
	| "scheduled"
	| "boarding"
	| "departed"
	| "landed"
	| "diverted"
	| "cancelled"
	| "delayed";

export interface Flight {
	id: string;
	flight_number: string;
	airline_code: string;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	status: FlightStatus;
	scheduled_departure: string;
	scheduled_arrival: string;
	estimated_departure: string | null;
	estimated_arrival: string | null;
	actual_departure: string | null;
	actual_arrival: string | null;
	gate_departure: string | null;
	gate_arrival: string | null;
	flight_date: string;
	is_return_flight: boolean;
	created_by: string | null;
}

export interface Paginationpagination {
	total: number;
	page: number;
	limit: number;
	total_pages: number;
}

export interface FlightsApiResponse {
	success: boolean;
	data: Flight[];
	pagination: Paginationpagination;
}

export interface SingleFlightApiResponse {
	success: boolean;
	data: Flight;
}

export interface FlightListApiResponse {
	success: boolean;
	data: Flight[];
}

export interface FlightQueryParams {
	page?: number;
	limit?: number;
	status?: FlightStatus | "";
	origin_airport?: string;
	destination_airport?: string;
	date?: string;
	sort_by?: "date" | "route" | "departure";
	sort_order?: "ASC" | "DESC";
}

export interface Aircraft {
	id: string;
	registration: string;
	model: string;
	name?: string;
}

export interface AircraftApiResponse {
	success: boolean;
	data: Aircraft[];
}

export interface FlightRow {
	id: string;
	flightNumber: string;
	airline: string;
	route: string;
	aircraft: string;
	date: string;
	departure: string;
	arrival: string;
	status: FlightStatus;
	return: string;
}
