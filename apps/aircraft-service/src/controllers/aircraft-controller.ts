import { Request, Response, NextFunction } from "express";
import * as service from "../services/aircraft-service";

interface IdParams {
	id: string;
}

export const createAircraft = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const aircraft = await service.createAircraft(req.body);
		res.status(201).json(aircraft);
	} catch (error) {
		next(error);
	}
};

export const getAircraft = async (
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

export const getAircraftById = async (
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

export const updateAircraft = async (
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

export const deleteAircraft = async (
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

export const addMaintenance = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const record = await service.addMaintenanceRecord(id, req.body);
		res.status(201).json(record);
	} catch (error) {
		next(error);
	}
};
