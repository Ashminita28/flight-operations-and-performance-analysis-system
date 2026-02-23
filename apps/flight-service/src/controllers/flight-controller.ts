import { Request, Response } from "express";
import * as service from "../services/flight-service";

export const createFlight = async (req: Request, res: Response) => {
	try {
		const { aircraft_id, route_id, departure_time } = req.body;
		const result = await service.createFlightService(
			aircraft_id,
			route_id,
			departure_time,
		);
		res.status(200).send(result.json());
	} catch (err) {
		console.error("flight not created", err);
		res.status(500);
	}
};

export const updateFlight = async (req: Request, res: Response) => {
	try {
		const result = await service.updateFlighService(req.body.id, req.body);
		res.status(200);
	} catch (err) {
		console.error("flight not updated", err);
		res.status(500);
	}
};

export const getFlights = async (req: Request, res: Response) => {
	try {
		const result = await service.getAllFlightsService();
		res.status(200);
	} catch (err) {
		console.error("cannot get flights", err);
		res.status(500);
	}
};

export const getFlightById = async (req: Request, res: Response) => {
	try {
		const result = await service.getFlightByIdService(req.body.id);
		res.status(200);
	} catch (err) {
		console.error("cannot get flight by id", err);
		res.status(500);
	}
};

export const deleteFlight = async (req: Request, res: Response) => {
	try {
		const result = await service.deleteFlightService(req.body.id);
		res.status(200);
	} catch (err) {
		console.error("flight cannot be deleted", err);
		res.status(500);
	}
};
