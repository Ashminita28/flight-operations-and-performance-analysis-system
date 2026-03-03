import { OperationalEvent } from "@package/shared-database";
import * as repo from "../repositories/operation-repository";
import { ApiError } from "@package/shared-utils";

export const operationService = {
	async createOperationalEvent(data: {
		flight_id: string;
		event_type: string | undefined;
		delay_category_id?: string | undefined;
		delay_minutes?: number | undefined;
		description?: string | undefined;
		event_time?: string | undefined;
		severity: string;
	}) {
		const flight = await repo.findFlightById(data.flight_id);

		if (!flight) {
			throw new ApiError(404, "Flight not found");
		}

		if (data.event_type === "delay") {
			if (!data.delay_category_id || !data.delay_minutes) {
				throw new ApiError(
					400,
					"Delay category and delay minutes are required for delay events",
				);
			}

			await repo.updateFlightStatus(data.flight_id, "delayed");
		}

		if (data.event_type === "cancellation") {
			await repo.updateFlightStatus(data.flight_id, "cancelled");
		}

		if (data.event_type === "diversion") {
			await repo.updateFlightStatus(data.flight_id, "diverted");
		}

		const event = await repo.create(data);

		return event;
	},

	async updateEvent(flightId: string, eventId: string, data: any) {
		const event = await repo.findById(eventId);
		if (!event) throw new Error("Event not found");

		return await repo.update(eventId, data);
	},

	async getEventsByFlight(flightId: string) {
		const flight = await repo.findFlightById(flightId);

		if (!flight) {
			throw new ApiError(404, "Flight not found");
		}

		return repo.findEventsByFlight(flightId);
	},

	async getAllFlightEvents() {
		const flight = await OperationalEvent.findAll();
		return flight;
	},
};
