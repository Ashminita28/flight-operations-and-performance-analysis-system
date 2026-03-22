import { z } from "zod";
export const exportSchema = z.object({
	email: z.string().email("Invalid email address"),
	time_filter: z.enum(["daily", "weekly", "monthly", "yearly"]),
	origin_airport: z.string().optional(),
	destination_airport: z.string().optional(),
	aircraft_id: z.string().optional(),
});
