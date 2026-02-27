import { Crew } from "@package/shared-database";

export const createCrewService = async (data: any) => {
	return await Crew.create(data);
};

export const getAllCrewService = async () => {
	return await Crew.findAll();
};

export const getCrewByIdService = async (id: string) => {
	return await Crew.findByPk(id);
};

export const updateCrewService = async (id: string, data: any) => {
	await Crew.update(data, { where: { id } });
	return await Crew.findByPk(id);
};

export const deleteCrewService = async (id: string) => {
	return await Crew.destroy({ where: { id } });
};
