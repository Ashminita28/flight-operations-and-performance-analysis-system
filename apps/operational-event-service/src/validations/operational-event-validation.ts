import { z } from "zod";
import { EVENT_TYPES } from "@package/shared-utils";

export const createOperationalEventSchema = z.object({
	flight_id: z.uuid("Invalid flight ID"),

	event_type: z.string(),

	delay_category_id: z.uuid().optional(),

	delay_minutes: z
		.number()
		.int()
		.min(1, "Delay must be at least 1 minute")
		.optional(),

	description: z.string().optional(),

	event_time: z.iso.datetime(),

	severity: z.string(),
});
