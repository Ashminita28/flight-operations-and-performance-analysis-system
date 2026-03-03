import { Flight, OperationalEvent } from "@package/shared-database";

export const create = async (data: any) => {
	const delay = await OperationalEvent.create(data);
	return delay;
};
export const findFlightById = async (id: string) => {
	const flight = await Flight.findByPk(id);
	console.log("flightttt:-", flight);
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
	return flight_event;
};

export const updateFlightStatus = async (flightId: string, status: string) => {
	return Flight.update({ status }, { where: { id: flightId } });
};

export const findEventsByFlight = (flightId: string) => {
	return OperationalEvent.findAll({
		where: { flight_id: flightId },
	});
};
