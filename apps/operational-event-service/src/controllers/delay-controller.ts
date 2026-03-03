import { Request, Response, NextFunction } from "express";
import { DelayCategoryService } from "../services/delay-category";
import { createDelayCategorySchema } from "../validations/delay-category-validation";

export const DelayCategoryController = {
	async create(req: Request, res: Response, next: NextFunction) {
		try {
			const validated = createDelayCategorySchema.parse(req.body);
			const category = await DelayCategoryService.createCategory(validated);

			return res.status(201).json({
				success: true,
				message: "Delay category created successfully",
				data: category,
			});
		} catch (error) {
			next(error);
		}
	},

	async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const categories = await DelayCategoryService.getAllCategories();

			return res.status(200).json({
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

			return res.status(204).send();
		} catch (error) {
			next(error);
		}
	},
};
