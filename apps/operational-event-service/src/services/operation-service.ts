import { OperationalEvent } from "@package/shared-database";
import * as repo from "../repositories/operation-repository";
import { ApiError, HTTP_STATUS, MESSAGES } from "@package/shared-utils";
import { publishNotification } from "./rabbitmq-publisher";

import { FlightStatus } from "@package/shared-utils/dist/constants/flight-status-transition";
import { INVALID_TRANSITIONS } from "@package/shared-utils/dist/constants/flight-status-transition";

export const operationService = {
	// RECORD AN OPERATIONAL EVENT
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
			throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.FLIGHT_NOT_FOUND);
		}

		const currentStatus = data.event_type as FlightStatus;

		if (
			INVALID_TRANSITIONS[currentStatus].includes(
				data.event_type as FlightStatus,
			)
		) {
			throw new ApiError(
				HTTP_STATUS.CONFLICT,
				`Cannot change flight status from '${currentStatus}' to '${data.event_type}'`,
			);
		}

		const event = await repo.create(data);
		await publishNotification({
			flight_id: flight.id,
			title: "Operational event occured",
			message: `Flight ${flight.flight_number} is ${data.event_type}`,
			type: event.event_type,
		});

		return event;
	},

	// UPDATE AN EVENT
	async updateEvent(flightId: string, eventId: string, data: any) {
		const event = await repo.findById(eventId);
		if (!event) throw new ApiError(HTTP_STATUS.NOT_FOUND, "Event not found");

		return await repo.update(eventId, data);
	},

	// GET EVENTS BY FLIGHT
	async getEventsByFlight(flightId: string) {
		const flight = await repo.findFlightById(flightId);

		if (!flight) {
			throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.FLIGHT_NOT_FOUND);
		}

		return repo.findEventsByFlight(flightId);
	},

	async getAllFlightEvents() {
		const flight = await OperationalEvent.findAll();
		return flight;
	},
};
