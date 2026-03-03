import { DelayCategoryRepository } from "../repositories/delaycategory-repository";
import { ApiError } from "@package/shared-utils";

export const DelayCategoryService = {
	async createCategory(data: { code: string; description: string }) {
		const existing = await DelayCategoryRepository.findByCode(data.code);
		if (existing) {
			throw new ApiError(409, "Delay category code already exists");
		}

		return DelayCategoryRepository.create(data);
	},

	async getAllCategories() {
		return DelayCategoryRepository.findAll();
	},

	async deleteCategory(id: string) {
		const category = await DelayCategoryRepository.findById(id);
		if (!category) {
			throw new ApiError(404, "Delay category not found");
		}

		await DelayCategoryRepository.delete(id);
	},
};
