import { FlightStatus } from "@package/shared-utils/dist/constants/flight-status-transition";

export interface CreateFlightBody {
	flight_number: string;
	airline_code: string;
	origin_airport: string;
	destination_airport: string;
	aircraft_id: string;
	status: string;
	scheduled_departure: string;
	scheduled_arrival: string;
	estimated_departure: string;
	estimated_arrival: string;
	actual_departure: string;
	actual_arrival: string;
	gate_departure: string;
	gate_arrival: string;
	is_return_flight: boolean;
	flight_date: Date;
	created_by: string;
}

export interface UpdateFlightBody {
	flight_number?: string;
	aircraft_id?: string;
	scheduled_departure?: string;
	scheduled_arrival?: string;
	estimated_departure?: string;
	estimated_arrival?: string;
	actual_departure?: string;
	actual_arrival?: string;
	gate_departure?: string;
	gate_arrival?: string;
}

export interface FlightQueryParams {
	page?: string;
	limit?: string;
	flight_number?: string;
	status?: FlightStatus;
	origin_airport?: string;
	destination_airport?: string;
	date?: string;
	sort_by?: "date" | "route" | "departure";
	sort_order?: "ASC" | "DESC";
}
