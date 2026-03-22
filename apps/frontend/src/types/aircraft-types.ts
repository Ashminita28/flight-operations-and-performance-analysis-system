export interface CreateAircraftDto {
	registration: string;
	icao_type: string;
	manufacturer: string;
	model: string;
	seat_capacity: number;
	fuel_capacity_kg: number;
	max_payload_kg: number;
	year_of_manufacture: number;
	status: string;
	base_airport_code: string;
	notes?: string;
}
export interface UpdateAircraftDto {
	registration: string;
	icao_type: string;
	manufacturer: string;
	model: string;
	seat_capacity: number;
	fuel_capacity_kg: string;
	max_payload_kg: string;
	year_of_manufacture: number;
	status: string;
	base_airport_code: string;
	notes: string;
}

export interface Aircraft {
	id: string;
	registration: string;
	model: string;
	name?: string;
}

export interface AircraftListResponse {
	data: never[];
	rows: Aircraft[];
	total: number;
	page: number;
	limit: number;
	total_pages: number;
}
