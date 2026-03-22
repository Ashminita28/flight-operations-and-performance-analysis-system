import { z } from "zod";

export const operationSchema = z.object({
	event_type: z.enum(["cancelled", "delayed", "diverted"]),
	delay_minutes: z.coerce
		.number()
		.int()
		.min(1, "Delay must be at least 1 minute")
		.optional(),
	description: z.string().optional(),
	event_time: z.coerce.date(),
	severity: z.string(),
});
