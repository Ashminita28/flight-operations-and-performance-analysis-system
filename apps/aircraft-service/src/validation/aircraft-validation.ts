import z from "zod";

export const createAircraftSchema = z.object({
	id: z.uuid(),
	registration: z.string(),
	icao_type: z.string(),
	manufacturer: z.string(),
	model: z.string(),
	seat_capacity: z.int(),
	fuel_capacity_kg: z.string(),
	max_payload_kg: z.string(),
	year_of_manufacture: z.number(),
	status: z.string(),
	base_airport_code: z.string(),
	notes: z.string(),
});

export type CreateAircraftBody = z.infer<typeof createAircraftSchema>;
