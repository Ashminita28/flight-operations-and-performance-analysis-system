import { Request, Response, NextFunction } from "express";
import * as service from "../services/aircraft-service";
import {
	CreateAircraftBody,
	createAircraftSchema,
} from "../validation/aircraft-validation";
import { HTTP_STATUS, MESSAGES, sendResponse } from "@package/shared-utils";

// Register a new aircraft
export const createAircraftController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const validateData: CreateAircraftBody = createAircraftSchema.parse(
			req.body,
		);
		const aircraft = await service.createAircraft(validateData);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.CREATED,
			success: true,
			message: MESSAGES.AIRCRAFT_CREATED,
			data: aircraft,
		});
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			data: aircraft,
		});
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.BAD_REQUEST,
				success: false,
				message: MESSAGES.AIRCRAFT_ID_REQUIRED,
			});
		}
		const aircraft = await service.getAircraftById(id);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: false,
			data: aircraft,
		});
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.CREATED,
			success: true,
			data: aircraft,
		});
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.BAD_REQUEST,
				success: false,
				message: MESSAGES.STATUS_REQUIRED,
			});
		}
		const aircraft = await service.changeAircraftStatus(id, status);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			message: MESSAGES.DELETED_SUCCESSFULLY,
		});
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
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.BAD_REQUEST,
				success: false,
				message: MESSAGES.DATE_REQUIRED,
			});
		}
		const aircraft = await service.getAircraftOnDate(date);
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
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
		return sendResponse({
			res,
			statusCode: HTTP_STATUS.OK,
			success: true,
			data: airports,
		});
	} catch (error) {
		next(error);
	}
};
