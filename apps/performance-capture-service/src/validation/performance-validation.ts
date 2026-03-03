import { z } from "zod";

export const createFlightPerformanceSchema = z.object({
	flight_id: z.uuid(),

	fuel_used_kg: z.number().positive(),
	distance_km: z.number().positive(),

	passengers_count: z.number().int().min(0),
	payload_kg: z.number().int().positive(),
});
