import { Aircraft, AircraftMaintenance } from "../models";

// Create Aircraft
export const createAircraft = async (data: any) => {
	return Aircraft.create(data);
};

// Get All Aircraft with Maintenance
export const getAllAircraft = async () => {
	return Aircraft.findAll({
		include: [
			{
				model: AircraftMaintenance,
				as: "maintenance_records",
			},
		],
	});
};

// Get Single Aircraft
export const getAircraftById = async (id: string) => {
	const aircraft = await Aircraft.findByPk(id, {
		include: [
			{
				model: AircraftMaintenance,
				as: "maintenance_records",
			},
		],
	});

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

//  Delete Aircraft
export const deleteAircraft = async (id: string) => {
	const aircraft = await Aircraft.findByPk(id);

	if (!aircraft) {
		throw new Error("Aircraft not found");
	}

	await aircraft.destroy();
	return true;
};

// Add Maintenance Record
export const addMaintenanceRecord = async (aircraftId: string, data: any) => {
	const aircraft = await Aircraft.findByPk(aircraftId);

	if (!aircraft) {
		throw new Error("Aircraft not found");
	}

	return AircraftMaintenance.create({
		...data,
		aircraft_id: aircraftId,
	});
};
