import * as repo from "../repositories/flights-repository";
import {
	CreateFlightBody,
	UpdateFlightBody,
	FlightQueryParams,
} from "../types/flight-types";
import { HTTP_STATUS } from "@package/shared-utils";
import { MESSAGES } from "@package/shared-utils";
import { ApiError } from "@package/shared-utils";
import { FlightStatus } from "@package/shared-utils/dist/constants/flight-status-transition";
import { INVALID_TRANSITIONS } from "@package/shared-utils/dist/constants/flight-status-transition";

// CREATING FLIGHTS
export const createFlightService = async (data: CreateFlightBody) => {
	if (new Date(data.scheduled_arrival) <= new Date(data.scheduled_departure)) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.INVALID_TIME);
	}

	if (data.origin_airport === data.destination_airport) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.SAME_AIRPORT);
	}

	const aircraft = await repo.findAircraftByIdRepo(data.aircraft_id);
	if (!aircraft) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AIRCRAFT_NOT_FOUND);
	}

	const overlappingFlight = await repo.findOverlappingFlightRepo(
		data.aircraft_id,
		data.scheduled_departure,
		data.scheduled_arrival,
	);

	if (overlappingFlight) {
		const error: any = new ApiError(
			HTTP_STATUS.CONFLICT,
			MESSAGES.AIRCRAFT_UNAVAILABLE,
		);
		error.statusCode = 409;
		throw error;
	}

	const existingFlight = await repo.searchFlightRepo(data.flight_number);
	if (existingFlight.some(f => f.flight_date === data.flight_date)) {
		throw new ApiError(HTTP_STATUS.CONFLICT, MESSAGES.FLIGHT_NUMBER_EXISTS);
	}

	if (new Date(data.scheduled_departure) < new Date()) {
		throw new ApiError(HTTP_STATUS.BAD_REQUEST, MESSAGES.DEPARTURE_PAST);
	}

	const flight = await repo.createFlightRepo(data);
	return flight;
};

// FETCHING ALL FLIGHTS DATA
export const getAllFlights = async (query: FlightQueryParams) => {
	return await repo.getAllFlightsRepo(query);
};

// GETTING FLIGHT BY ITS ID
export const getFlightById = async (id: string) => {
	const flight = await repo.getFlightByIdRepo(id);
	return flight;
};

// UPDATING FLIGHT DATA
export const updateFlight = async (id: string, data: UpdateFlightBody) => {
	const flight = await repo.updateFlightRepo(id, data);
	return flight;
};

// UPDATING FLIGHT STATUS
export const updateFlightStatusService = async (id: string, status: string) => {
	const flight = await repo.getFlightByIdRepo(id);
	if (!flight)
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.FLIGHT_NOT_FOUND);

	const currentStatus = flight.status as FlightStatus;

	if (INVALID_TRANSITIONS[currentStatus].includes(status as FlightStatus)) {
		throw new ApiError(
			HTTP_STATUS.CONFLICT,
			`Cannot change flight status from '${currentStatus}' to '${status}'`,
		);
	}

	return await repo.updateFlightStatusRepo(id, status);
};

// SEARCHING FLIGHT BY ITS NUMBER
export const searchFlight = async (flightNumber: string) => {
	return await repo.searchFlightRepo(flightNumber);
};

// DELETE A FLIGHT BY ITS ID
export const deleteFlight = async (id: string) => {
	await repo.deleteFlightRepo(id);
};

// GET PRESENT DAY FLIGHT
export const getTodaysFlights = async () => {
	return await repo.getTodaysFlightsRepo();
};
