export interface FlightAnalyticsRow {
	flight_date: Date;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	total_flights: number;
	delayed_flights: number;
	avg_delay_minutes: number;
	total_flight_hours: number;
	avg_load_factor_pct: number;
	avg_fuel_efficiency: number;
}
