import {
	Flight,
	OperationalEvent,
	DelayCategory,
} from "@package/shared-database";

export const create = async (data: any) => {
	const delay = await DelayCategory.create(data);
	return delay;
};
export const findFlightById = async (id: string) => {
	const flight = await Flight.findByPk(id);
	return flight;
};

export const findById = async (id: string) => {
	const event = await OperationalEvent.findByPk(id);
	return event;
};

export const update = async (eventId: string, data: any) => {
	const flight_event = await OperationalEvent.update(data, {
		where: { id: eventId },
	});
};
