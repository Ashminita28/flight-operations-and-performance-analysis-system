import { Aircraft, Flight, Airport } from "@package/shared-database";
import { Op } from "sequelize";

interface CreateAircraftDTO {
	registration: string;
	icao_type: string;
	manufacturer: string;
	model: string;
	seat_capacity: number;
	fuel_capacity_kg: string;
	max_payload_kg: string;
	year_of_manufacture: number;
	status: string;
	base_airport_code: string;
	notes: string;
}
// Create Aircraft
export const createAircraft = async (data: CreateAircraftDTO) => {
	console.log(Aircraft.getAttributes());
	console.log(data);
	const aircraft = await Aircraft.create(data);
	return aircraft;
};

// Get All Aircraft with Maintenance
export const getAllAircraft = async () => {
	return await Aircraft.findAll({
		order: [["createdAt", "DESC"]],
	});
};

// Get Single Aircraft
export const getAircraftById = async (id: string) => {
	const aircraft = await Aircraft.findByPk(id, {});

	if (!aircraft) {
		throw new Error("Aircraft not found");
	}

	return aircraft;
};

//  Update Aircraft
export const updateAircraft = async (id: string, data: any) => {
	const aircraft = await Aircraft.findByPk(id);

	if (!aircraft) {
		throw new Error("Aircraft not found");
	}

	return aircraft.update(data);
};

// change aircraft status
export const changeAircraftStatus = async (id: string, status: string) => {
	const aircraft = await Aircraft.findByPk(id);
	if (!aircraft) {
		throw new Error("Aircraft not found");
	}
	return aircraft.update({ status: status });
};

//  Delete Aircraft
export const deleteAircraft = async (id: string) => {
	const aircraft = await Aircraft.findByPk(id);

	if (!aircraft) {
		throw new Error("Aircraft not found");
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
