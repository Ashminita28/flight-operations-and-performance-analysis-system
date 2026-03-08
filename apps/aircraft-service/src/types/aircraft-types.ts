export interface CreateAircraftDTO {
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

export interface PaginationOptions {
	page?: number;
	limit?: number;
	search?: string;
}
