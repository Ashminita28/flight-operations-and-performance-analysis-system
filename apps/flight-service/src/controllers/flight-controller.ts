import { Request, Response, NextFunction } from "express";
import * as service from "../services/flight-service";

// Create Flight
export const createFlightController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log("iuiu", req.body);
		const flight = await service.createFlightService(req.body);

		res.status(201).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// Get All Flights
export const getAllFlightsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const flights = await service.getAllFlights();
		res.status(201).json({
			success: true,
			data: flights,
		});
	} catch (error) {
		next(error);
	}
};

// Get Flight by ID
export const getFlightByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.getFlightById(id);

		res.status(201).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// Update flight by id
export const updateFlightByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.updateFlight(id, req.body);

		res.status(201).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// Delete Flight
export const deleteFlightById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;

		if (!id) {
			return res.status(400).json({
				success: false,
				message: "Flight ID is required",
			});
		}

		await service.deleteFlight(id);

		res.status(200).json({
			success: true,
			message: "Flight deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

// Today's Flights
export const getTodaysFlightUpdates = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const flights = await service.getTodaysFlights();

		res.status(200).json({
			success: true,
			data: flights,
		});
	} catch (error) {
		next(error);
	}
};

// change flight status by id
export const changeFlightStatusByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.updateFlightStatusService(id, req.body.status);

		res.status(201).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// Search Flight
export const searchFlightController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const flightNumber = req.query.flight_number as string;

		if (!flightNumber) {
			return res.status(400).json({
				success: false,
				message: "Flight number query parameter is required",
			});
		}

		const flights = await service.searchFlight(flightNumber);

		res.status(200).json({
			success: true,
			data: flights,
		});
	} catch (error) {
		next(error);
	}
};
