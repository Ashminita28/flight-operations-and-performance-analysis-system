import { Flight, Aircraft } from "@package/shared-database";
import { Op } from "sequelize";

// create flight service only if aircraft available
export const createFlightService = async (data: any) => {
	try {
		if (
			new Date(data.scheduled_arrival) <= new Date(data.scheduled_departure)
		) {
			throw new Error("Arrival time must be after departure time");
		}
		if (data.origin_airport === data.destination_airport) {
			throw new Error("Origin and destination cannot be true");
		}
		const aircraft = await Aircraft.findByPk(data.aircraft_id);
		if (!aircraft) {
			throw new Error("Aircraft not found");
		}
		if (aircraft.status === "maintainance") {
			throw new Error("Aircraft is under maintainance");
		}
		const overlappingFlight = await Flight.findOne({
			where: {
				aircraft_id: data.aircraft_id,
				scheduled_departure: {
					[Op.lt]: data.scheduled_arrival,
				},
				scheduled_arrival: {
					[Op.gt]: data.scheduled_departure,
				},
			},
		});

		if (overlappingFlight) {
			const error: any = new Error(
				"Aircraft already assigned to overlapping flight",
			);
			error.statusCode = 409;
			throw error;
		}
		const flight = await Flight.create(data);
		return flight;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// get all the flights
export const getAllFlights = async () => {
	const flight = await Flight.findAll();
	return flight;
};

// get flight by its id

export const getFlightById = async (id: string) => {
	const flight = await Flight.findByPk(id);
	return flight;
};

// update flight
export const updateFlight = async (id: string, data: any) => {
	const flight = await Flight.findByPk(id);
	if (!flight) throw new Error("Flight not found");
	await flight.update(data);
};

// update status of flight service
export const updateFlightStatusService = async (id: string, status: string) => {
	const flight = await Flight.findByPk(id);

	if (!flight) throw new Error("Flight not found");

	await flight.update({
		status,
	});

	return flight;
};

// Search Flight
export const searchFlight = async (flightNumber: string) => {
	return await Flight.findAll({
		where: {
			flight_number: {
				[Op.iLike]: `%${flightNumber}%`,
			},
		},
	});
};

// delete flight
export const deleteFlight = async (id: string) => {
	const flight = await Flight.findByPk(id);

	if (!flight) {
		throw new Error("Flight not found");
	}

	await flight.destroy();
};

// Today's Flights
export const getTodaysFlights = async () => {
	const today = new Date().toISOString().split("T")[0];

	return await Flight.findAll({
		where: {
			flight_date: today,
		},
	});
};
