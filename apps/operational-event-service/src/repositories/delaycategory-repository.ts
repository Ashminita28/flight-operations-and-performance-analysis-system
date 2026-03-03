import { DelayCategory } from "@package/shared-database";

export const DelayCategoryRepository = {
	async create(data: { code: string; description: string }) {
		return DelayCategory.create(data as any);
	},

	async findByCode(code: string) {
		return DelayCategory.findOne({ where: { code } });
	},

	async findAll() {
		return DelayCategory.findAll();
	},

	async findById(id: string) {
		return DelayCategory.findByPk(id);
	},

	async delete(id: string) {
		return DelayCategory.destroy({ where: { id } });
	},
};
