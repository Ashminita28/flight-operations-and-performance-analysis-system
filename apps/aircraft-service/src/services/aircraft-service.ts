import { Aircraft, Flight, Airport } from "@package/shared-database";
import {
	createAircraftRepo,
	getAllAircraftRepo,
	getAircraftByIdRepo,
	updateAircraftRepo,
	changeAircraftStatusRepo,
	deleteAircraftRepo,
	getAircraftOnDateRepo,
} from "../repositories/aircraft-repository";
import { Op } from "sequelize";
import { CreateAircraftDTO, PaginationOptions } from "../types/aircraft-types";
import { ApiError } from "@package/shared-utils";
import { HTTP_STATUS } from "@package/shared-utils";
import { MESSAGES } from "@package/shared-utils";

// Create Aircraft
export const createAircraft = async (data: CreateAircraftDTO) => {
	const aircraft = await createAircraftRepo(data);
	return aircraft;
};

// Get All Aircraft with Maintenance
export const getAllAircraft = async (options: PaginationOptions = {}) => {
	return await getAllAircraftRepo(options);
};

// Get Single Aircraft
export const getAircraftById = async (id: string) => {
	const aircraft = await getAircraftByIdRepo(id);
	if (!aircraft) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AIRCRAFT_NOT_FOUND);
	}

	return aircraft;
};

//  Update Aircraft
export const updateAircraft = async (id: string, data: CreateAircraftDTO) => {
	const aircraft = await getAircraftByIdRepo(id);

	if (!aircraft) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AIRCRAFT_NOT_FOUND);
	}

	return await updateAircraftRepo(id, data);
};

// change aircraft status
export const changeAircraftStatus = async (id: string, status: string) => {
	const aircraft = await Aircraft.findByPk(id);
	if (!aircraft) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AIRCRAFT_NOT_FOUND);
	}
	return aircraft.update({ status: status });
};

//  Delete Aircraft
export const deleteAircraft = async (id: string) => {
	const aircraft = await Aircraft.findByPk(id);

	if (!aircraft) {
		throw new ApiError(HTTP_STATUS.NOT_FOUND, MESSAGES.AIRCRAFT_NOT_FOUND);
	}

	await aircraft.destroy();
	return true;
};

//  List aircraft available for assignment on a date
export const getAircraftOnDate = async (date: string) => {
	const busyAircraft = await Flight.findAll({
		where: {
			flight_date: date,
		},
		attributes: ["aircraft_id"],
	});

	const busyIds = busyAircraft.map((f: any) => f.aircraft_id);
	return await Aircraft.findAll({
		where: { id: { [Op.notIn]: busyIds } },
	});
};

// Get all airports
export const getAllAirports = async () => {
	return await Airport.findAll();
};
