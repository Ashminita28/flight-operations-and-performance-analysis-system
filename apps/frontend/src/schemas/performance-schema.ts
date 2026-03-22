import { z } from "zod";

export const perfromanceSchema = z.object({
	fuel_used_kg: z.number().positive(),
	distance_km: z.number().positive(),
	passengers_count: z.number().int().positive(),
	flight_time_minutes: z.number().positive(),
});
