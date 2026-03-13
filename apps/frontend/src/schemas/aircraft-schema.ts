import z from "zod";

export const aircraftSchema = z.object({
	registration: z.string().min(3),
	icao_type: z.string().min(2),
	manufacturer: z.string().min(2),
	model: z.string().min(2),
	seat_capacity: z.coerce.number().positive(),
	fuel_capacity_kg: z.coerce.number().positive(),
	max_payload_kg: z.coerce.number().positive(),
	year_of_manufacture: z.coerce.number().min(1950),
	status: z.string(),
	base_airport_code: z.string().min(3),
	notes: z.string().optional(),
});
