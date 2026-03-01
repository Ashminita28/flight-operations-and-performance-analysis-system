import { Request, Response, NextFunction } from "express";
import * as service from "../services/aircraft-service";
// import { Aircraft } from "@package/shared-database";

// Register a new aircraft
export const createAircraftController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const {
			registration,
			icao_type,
			manufacturer,
			model,
			seat_capacity,
			fuel_capacity_kg,
			max_payload_kg,
			year_of_manufacture,
			status,
			base_airport_code,
			notes,
		} = req.body;
		console.log(req.body);
		const aircraft = await service.createAircraft({
			registration,
			icao_type,
			manufacturer,
			model,
			seat_capacity,
			fuel_capacity_kg,
			max_payload_kg,
			year_of_manufacture,
			status,
			base_airport_code,
			notes,
		});
		res.status(201).json(aircraft);
	} catch (error) {
		next(error);
	}
};

// Get all aircraft
export const getAllAircraftController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const aircraft = await service.getAllAircraft();
		res.json(aircraft);
	} catch (error) {
		next(error);
	}
};

// Get aircraft by id
export const getAircraftByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		if (!id) {
			return res.status(400).json({ message: "Aircraf id required" });
		}
		const aircraft = await service.getAircraftById(id);
		res.json(aircraft);
	} catch (error) {
		next(error);
	}
};

// update aircraft information by id
export const updateAircraftByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const aircraft = await service.updateAircraft(id, req.body);
		res.json(aircraft);
	} catch (error) {
		next(error);
	}
};

// change aircraft status
export const changeAircraftStatusController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const { status } = req.body;
		if (!status) {
			return res.status(400).json({
				success: false,
				message: "Status required",
			});
		}
		const aircraft = await service.changeAircraftStatus(id, status);
		res.status(200).json({
			success: true,
			data: aircraft,
		});
	} catch (error) {
		next(error);
	}
};

// delete an aircraft
export const deleteAircraftByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		await service.deleteAircraft(id);
		res.json({ message: "Aircraft deleted successfully" });
	} catch (error) {
		next(error);
	}
};

// List aircraft available for assignment on a date
export const getAvailableAircraftByDateController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const date = req.query.date as string;

		if (!date) {
			return res.status(400).json({
				success: false,
				message: "Date query param required",
			});
		}

		const aircraft = await service.getAircraftOnDate(date);

		res.status(200).json({
			success: true,
			data: aircraft,
		});
	} catch (error) {
		next(error);
	}
};

// Get all airports
export const getAllAirportsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const airports = await service.getAllAirports();

		res.status(200).json({
			success: true,
			data: airports,
		});
	} catch (error) {
		next(error);
	}
};
