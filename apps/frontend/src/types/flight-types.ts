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
	status: string;
	scheduled_departure: string;
	scheduled_arrival: string;
	gate_departure: string;
	gate_arrival: string;
	flight_date: Date;
	is_return_flight: boolean;
}

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
