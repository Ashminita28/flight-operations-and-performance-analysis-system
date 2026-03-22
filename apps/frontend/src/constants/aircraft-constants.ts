import type { AircraftFormInput } from "@/schemas/aircraft-schema";

export const DEFAULT_VALUES: AircraftFormInput = {
	registration: "",
	icao_type: "",
	manufacturer: "",
	model: "",
	seat_capacity: "",
	fuel_capacity_kg: "",
	max_payload_kg: "",
	year_of_manufacture: "",
	status: "",
	base_airport_code: "",
	notes: "",
};
