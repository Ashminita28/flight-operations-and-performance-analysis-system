import { Request, Response, NextFunction } from "express";
import * as service from "../services/flight-service";
import {
	CreateFlightBody,
	createFlightSchema,
} from "../validation/flight-validation";
import { HTTP_STATUS } from "@package/shared-utils";

// 1.CREATE FLIGHT
export const createFlightController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validatedData: CreateFlightBody = createFlightSchema.parse(req.body);
		const flight = await service.createFlightService(validatedData);

		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// 2.GET ALL FLIGHT
export const getAllFlightsController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const result = await service.getAllFlights(req.query as never);

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: result.flights,
			meta: result.meta,
		});
	} catch (error) {
		next(error);
	}
};

// GET FLIGHT BY ID
export const getFlightByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.getFlightById(id);

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// UPDATE FLIGHT BY ID
export const updateFlightByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.updateFlight(id, req.body);

		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// DELETE FLIGHT BY ID
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

		res.status(HTTP_STATUS.OK).json({
			success: true,
			message: "Flight deleted successfully",
		});
	} catch (error) {
		next(error);
	}
};

// GET FLIGHT BY CURRENT DATE
export const getTodaysFlightUpdates = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const flights = await service.getTodaysFlights();

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: flights,
		});
	} catch (error) {
		next(error);
	}
};

// CHANGE FLIGHT STATUS
export const changeFlightStatusByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id = req.params.id as string;
		const flight = await service.updateFlightStatusService(id, req.body.status);

		res.status(HTTP_STATUS.CREATED).json({
			success: true,
			data: flight,
		});
	} catch (error) {
		next(error);
	}
};

// SEARCH FLIGHT
export const searchFlightController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const flightNumber = req.query.flight_number as string;

		if (!flightNumber) {
			return res.status(HTTP_STATUS.BAD_REQUEST).json({
				success: false,
				message: "Flight number query parameter is required",
			});
		}

		const flights = await service.searchFlight(flightNumber);

		res.status(HTTP_STATUS.OK).json({
			success: true,
			data: flights,
		});
	} catch (error) {
		next(error);
	}
};
