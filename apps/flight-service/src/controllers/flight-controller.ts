import { Request, Response, NextFunction } from "express";
import * as service from "../services/flight-service";

// Create Flight
export const createFlight = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const flight = await service.createFlightService(req.body);

		res.status(201).json(flight);
	} catch (error) {
		next(error);
	}
};

// Get All Flights
export const getFlights = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const flights = await service.getAllFlights();
		res.json(flights);
	} catch (error) {
		next(error);
	}
};

// Get Flight by ID

export const getFlightById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.getFlightById(id);

		res.json(flight);
	} catch (error) {
		next(error);
	}
};

// Update Status

export const updateFlightStatus = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.updateFlightStatusService(
			id,
			req.body.status,
			req.body.delay_reason,
			req.body.delay_minutes,
		);

		res.json(flight);
	} catch (error) {
		next(error);
	}
};

// Assign Crew

export const assignCrew = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const record = await service.assignCrewService(
			req.body.flight_id,
			req.body.crew_id,
		);

		res.json(record);
	} catch (error) {
		next(error);
	}
};

export const assignAircraft = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await service.assignAircraftService(
			req.body.flight_id,
			req.body.aircraft_id,
		);

		res.json(result);
	} catch (err) {
		next(err);
	}
};
