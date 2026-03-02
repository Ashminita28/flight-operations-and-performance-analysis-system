import * as repo from "../repositories/operation-repository";
import * as delayCategoryRepo from "../repositories/delaycategory-repository";

export const operationService = {
	async createOperationalEvent(flightId: string, data: any, userId: string) {
		const flight = await repo.findFlightById(flightId);
		if (!flight) throw new Error("Flight not found");

		const validTypes = [
			"delay",
			"diversion",
			"cancellation",
			"equipment_change",
			"gate_change",
			"crew_change",
			"medical",
			"security",
		];

		if (!validTypes.includes(data.event_type))
			throw new Error("Invalid event type");

		if (data.event_type === "delay") {
			if (!data.delay_category_id) throw new Error("Delay category required");

			if (!data.delay_minutes || data.delay_minutes <= 0)
				throw new Error("Delay minutes must be positive");

			const category = await delayCategoryRepo.findById(data.delay_category_id);
			if (!category) throw new Error("Invalid delay category");
		}
		if (!data.event_time) throw new Error("Event time required");

		return await repo.create({
			...data,
			flight_id: flightId,
			reported_by: userId,
		});
	},

	async updateEvent(flightId: string, eventId: string, data: any) {
		const event = await repo.findById(eventId);
		if (!event) throw new Error("Event not found");

		if (event.resolved_at) throw new Error("Cannot update resolved event");

		return await repo.update(eventId, data);
	},
};
