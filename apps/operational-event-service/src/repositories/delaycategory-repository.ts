import { OperationalEvent } from "@package/shared-database";

export const findById = async (id: string) => {
	const delay = await OperationalEvent.findByPk(id);
	return delay;
};
