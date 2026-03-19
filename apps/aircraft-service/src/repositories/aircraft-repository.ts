import { Aircraft, Flight, Airport } from "@package/shared-database";
import { Op } from "sequelize";
import { CreateAircraftDTO, PaginationOptions } from "../types/aircraft-types";

export const createAircraftRepo = async (data: CreateAircraftDTO) => {
	return await Aircraft.create(data);
};

export const getAllAircraftRepo = async (options: PaginationOptions = {}) => {
	const page = options.page || 1;
	const limit = options.limit || 10;
	const offset = (page - 1) * limit;

	const whereClause = options.search
		? {
				[Op.or]: [
					{ registration: { [Op.iLike]: `%${options.search}%` } },
					{ manufacturer: { [Op.iLike]: `%${options.search}%` } },
					{ model: { [Op.iLike]: `%${options.search}%` } },
				],
			}
		: {};

	return await Aircraft.findAndCountAll({
		where: whereClause,
		order: [["createdAt", "DESC"]],
		limit,
		offset,
	});
};

export const getAircraftByIdRepo = async (id: string) => {
	return await Aircraft.findByPk(id);
};

export const updateAircraftRepo = async (
	id: string,
	data: CreateAircraftDTO,
) => {
	const aircraft = await Aircraft.findByPk(id);
	if (!aircraft) return null;
	return await aircraft.update(data);
};

export const changeAircraftStatusRepo = async (id: string, status: string) => {
	const aircraft = await Aircraft.findByPk(id);
	if (!aircraft) return null;
	return await aircraft.update({ status });
};

export const deleteAircraftRepo = async (id: string) => {
	const aircraft = await Aircraft.findByPk(id);
	if (!aircraft) return false;
	await aircraft.destroy();
	return true;
};

export const getAircraftOnDateRepo = async (date: string) => {
	const busyFlights = await Flight.findAll({
		where: { flight_date: date },
		attributes: ["aircraft_id"],
	});

	const busyIds: string[] = busyFlights.map(f => f.aircraft_id);

	return await Aircraft.findAll({
		where: { id: { [Op.notIn]: busyIds } },
	});
};

export const updateAircraftStatus = async (id: string, status: string) => {
	const aircraft = await Aircraft.findByPk(id);
	if (!aircraft) return false;
	await aircraft.update({ status: status });
	return true;
};

export const getAllAirportRepo = async () => {
	return await Airport.findAll();
};
