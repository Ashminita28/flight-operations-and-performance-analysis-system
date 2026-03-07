import { Flight, Aircraft } from "@package/shared-database";
import { Op } from "sequelize";
import {
	CreateFlightBody,
	UpdateFlightBody,
	FlightQueryParams,
} from "../types/flight-types";

// INSERT A NEW FLIGHT IN DB
export const createFlightRepo = async (data: CreateFlightBody) => {
	const flight = await Flight.create(data);
	return flight;
};

// SELECT ALL FLIGHT DATA FROM DB
export const getAllFlightsRepo = async (query: FlightQueryParams) => {
	const page = parseInt(query.page || "1");
	const limit = parseInt(query.limit || "20");
	const offset = (page - 1) * limit;
	const sortOrder =
		(query.sort_order || "ASC").toUpperCase() === "DESC" ? "DESC" : "ASC";

	const where: Record<string, unknown> = {};

	if (query.flight_number) {
		where.flight_number = { [Op.iLike]: `%${query.flight_number}%` };
	}
	if (query.status) {
		where.status = query.status;
	}
	if (query.origin_airport) {
		where.origin_airport = query.origin_airport.toUpperCase();
	}
	if (query.destination_airport) {
		where.destination_airport = query.destination_airport.toUpperCase();
	}
	if (query.date) {
		where.flight_date = query.date;
	}

	let order: [string, string][];
	if (query.sort_by === "date") {
		order = [["flight_date", sortOrder]];
	} else if (query.sort_by === "route") {
		order = [
			["origin_airport", sortOrder],
			["destination_airport", sortOrder],
		];
	} else {
		order = [["scheduled_departure", sortOrder]];
	}

	const { rows, count } = await Flight.findAndCountAll({
		where,
		limit,
		offset,
		order,
		logging: console.log,
	});

	return {
		flights: rows,
		meta: {
			total: count,
			page,
			limit,
			total_pages: Math.ceil(count / limit),
		},
	};
};

// SELECT FLIGHT BY ITS ID
export const getFlightByIdRepo = async (id: string) => {
	const flight = await Flight.findByPk(id);
	return flight;
};

// UPDATE FLIGHT BY ITS ID
export const updateFlightRepo = async (id: string, data: UpdateFlightBody) => {
	const flight = await Flight.findByPk(id);
	if (!flight) return null;
	await flight.update(data);
	return flight;
};

// UPDATE FLIGHT STATUS BY ITS ID
export const updateFlightStatusRepo = async (id: string, status: string) => {
	const flight = await Flight.findByPk(id);
	if (!flight) return null;
	await flight.update({ status });
	return flight;
};

// DELETE FLIGHT BY ITS ID
export const deleteFlightRepo = async (id: string) => {
	const flight = await Flight.findByPk(id);
	if (!flight) return null;
	await flight.destroy();
};

// SELECT CURRENT DATE FLIGHT DATA
export const getTodaysFlightsRepo = async () => {
	const today = new Date().toISOString().split("T")[0];
	return await Flight.findAll({
		where: { flight_date: today },
	});
};

// FIND FLIGHTS BY THEIR NUMBER
export const searchFlightRepo = async (flightNumber: string) => {
	return await Flight.findAll({
		where: {
			flight_number: { [Op.iLike]: `%${flightNumber}%` },
		},
	});
};

// FIND FLIGHT THAT HAS ALREADY ASSIGNED TO AN AIRCRAFT
export const findOverlappingFlightRepo = async (
	aircraftId: string,
	scheduledDeparture: string,
	scheduledArrival: string,
) => {
	return await Flight.findOne({
		where: {
			aircraft_id: aircraftId,
			scheduled_departure: { [Op.lt]: scheduledArrival },
			scheduled_arrival: { [Op.gt]: scheduledDeparture },
		},
	});
};

// FIND AIRCRAFT BY ITS ID
export const findAircraftByIdRepo = async (aircraftId: string) => {
	return await Aircraft.findByPk(aircraftId);
};
