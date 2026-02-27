// import axios from "axios";
// import Flight from "../models/flight";
// import FlightCrew from "../models/flight-crew";
// import Crew from "../models/crew";
// import { refreshDashboard } from "./dashboard-service";
// import { Aircraft } from "../models/connection-models/aircraft";

import { Flight, FlightCrew, Crew, Aircraft } from "@package/shared-database";

// create flight service only if aircraft available
export const createFlightService = async (data: any) => {
	try {
		console.log("j:-", data);
		console.log("hsjjdmksksl");
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
export const updateFlightStatusService = async (
	id: string,
	status: string,
	delay_reason?: string,
	delay_minutes?: number,
) => {
	const flight = await Flight.findByPk(id);

	if (!flight) throw new Error("Flight not found");

	await flight.update({
		status,
		delay_reason,
		delay_minutes,
	});

	return flight;
};

// assign crew to flight
export const assignCrewService = async (flight_id: string, crew_id: string) => {
	const flight = await Flight.findByPk(flight_id);

	if (!flight) throw new Error("Flight not found");

	const crew = await Crew.findByPk(crew_id);

	if (!crew) throw new Error("Crew not found");

	return FlightCrew.create({
		flight_id,
		crew_id,
	});
};

export const assignAircraftService = async (
	aircraft_id: string,
	flight_id: string,
) => {
	const flight = await Aircraft.findByPk(flight_id);
	if (!flight) throw new Error("flight not found");
	const aircraft = await Aircraft.findByPk(aircraft_id);

	if (!aircraft) throw new Error("aircraft not found");

	await flight.update({ aircraft_id: aircraft_id });
	return {
		message: "Aircraft assigned successfully",
	};
};
