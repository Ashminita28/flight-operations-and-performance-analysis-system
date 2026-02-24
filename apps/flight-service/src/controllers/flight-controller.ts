import { Request, Response } from "express";
import * as service from "../services/flight-service";

interface IdParams {
	id: string;
}

export const createFlight = async (req: Request<IdParams>, res: Response) => {
	try {
		console.log("ikaiskis");
		const flight = await service.createFlightService(req.params.id, req.body);
		console.log("sircraft created:-", flight);

		res.status(201).json(flight);
	} catch (err: any) {
		res.status(500).json({
			message: err.message,
		});
	}
};

export const getFlights = async (req: Request, res: Response) => {
	const flights = await service.getAllFlights();

	res.json(flights);
};

export const getFlightById = async (req: Request<IdParams>, res: Response) => {
	const flight = await service.getFlightById(req.params.id);

	res.json(flight);
};

export const updateFlightStatus = async (
	req: Request<IdParams>,
	res: Response,
) => {
	const flight = await service.updateFlightStatusService(
		req.params.id,
		req.body.status,
		req.body.delay_reason,
		req.body.delay_minutes,
	);

	res.json(flight);
};

export const assignCrew = async (req: Request, res: Response) => {
	const record = await service.assignCrewService(
		req.body.flight_id,
		req.body.crew_id,
	);

	res.json(record);
};
