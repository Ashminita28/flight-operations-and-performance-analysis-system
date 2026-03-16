import { Request, Response, NextFunction } from "express";
import { DelayCategoryService } from "../services/delay-category";
import { createDelayCategorySchema } from "../validations/delay-category-validation";
import { HTTP_STATUS, MESSAGES } from "@package/shared-utils";
import { sendResponse } from "@package/shared-utils";

export const DelayCategoryController = {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const validated = createDelayCategorySchema.parse(req.body);
			const category = await DelayCategoryService.createCategory(validated);
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.CREATED,
				success: true,
				message: MESSAGES.DELAY_CATEGORY_CREATED,
				data: category,
			});
		} catch (error) {
			next(error);
		}
	},

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await DelayCategoryService.getAllCategories();
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				data: categories,
			});
		} catch (error) {
			next(error);
		}
	},

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			await DelayCategoryService.deleteCategory(req.params.id as string);
			return sendResponse({
				res,
				statusCode: HTTP_STATUS.OK,
				success: true,
				message: MESSAGES.DELETED_SUCCESSFULLY,
			});
		} catch (error) {
			next(error);
		}
	},
};
