import { z } from "zod";

export const createFlightSchema = z.object({
	flight_number: z.string().min(1),
	airline_code: z.string().min(1),
	origin_airport: z.string().length(3),
	destination_airport: z.string().length(3),
	aircraft_id: z.string(),
	status: z.enum([
		"scheduled",
		"boarding",
		"departed",
		"landed",
		"diverted",
		"cancelled",
		"delayed",
	]),
	scheduled_departure: z.string(),
	scheduled_arrival: z.string(),
	estimated_departure: z.string(),
	estimated_arrival: z.string(),
	actual_departure: z.string(),
	actual_arrival: z.string(),
	gate_departure: z.string(),
	gate_arrival: z.string(),
	flight_date: z.preprocess(val => new Date(val as string), z.date()),
	is_return_flight: z.boolean(),
	created_by: z.string(),
});

export type CreateFlightBody = z.infer<typeof createFlightSchema>;
