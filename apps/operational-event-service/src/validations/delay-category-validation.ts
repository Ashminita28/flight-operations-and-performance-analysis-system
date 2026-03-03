import { z } from "zod";

export const createDelayCategorySchema = z.object({
	code: z
		.string()
		.min(2, "Code must be at least 2 characters")
		.max(10)
		.regex(/^[A-Z0-9_]+$/, "Code must be uppercase alphanumeric"),
	description: z.string().min(5, "Description must be meaningful").max(255),
});
