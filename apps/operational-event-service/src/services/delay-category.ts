import { DelayCategoryRepository } from "../repositories/delaycategory-repository";
import { ApiError, HTTP_STATUS, MESSAGES } from "@package/shared-utils";

export const DelayCategoryService = {
	async createCategory(data: { code: string; description: string }) {
		const existing = await DelayCategoryRepository.findByCode(data.code);
		if (existing) {
			throw new ApiError(
				HTTP_STATUS.CONFLICT,
				MESSAGES.DELAY_CODE_ALREADY_EXISTS,
			);
		}

		return DelayCategoryRepository.create(data);
	},

	async getAllCategories() {
		return DelayCategoryRepository.findAll();
	},

	async deleteCategory(id: string) {
		const category = await DelayCategoryRepository.findById(id);
		if (!category) {
			throw new ApiError(
				HTTP_STATUS.NOT_FOUND,
				MESSAGES.DELAY_CATEGORY_NOT_FOUND,
			);
		}

		await DelayCategoryRepository.delete(id);
	},
};
