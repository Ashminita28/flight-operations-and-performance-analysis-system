import { Request, Response, NextFunction } from "express";
import * as service from "../services/flight-service";
import {
	CreateFlightBody,
	createFlightSchema,
} from "../validation/flight-validation";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";

// 1.CREATE FLIGHT
export const createFlightController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validatedData: CreateFlightBody = createFlightSchema.parse(req.body);
		const flight = await service.createFlightService(validatedData);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.CREATED,
			success: true,
			message: MESSAGES.FLIGHT_CREATED,
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.ALL_FLIGHTS,
			data: result.flights,
			pagination: result.pagination,
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.ALL_FLIGHTS,
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.CREATED,
			success: true,
			message: MESSAGES.FLIGHT_UPDATED,
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.BAD_REQUEST,
				success: true,
				message: MESSAGES.FLIGHT_ID_REQUIRED,
			});
		}
		await service.deleteFlight(id);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.FLIGHT_DELETED,
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.TODAYS_FLIGHT,
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.CREATED,
			success: true,
			message: MESSAGES.FLIGHT_STATUS_UPDATED,
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.BAD_REQUEST,
				success: true,
				message: MESSAGES.FLIGHT_SEARCH,
			});
		}
		const flights = await service.searchFlight(flightNumber);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.FLIGHT_SEARCH,
			data: flights,
		});
	} catch (error) {
		next(error);
	}
};
