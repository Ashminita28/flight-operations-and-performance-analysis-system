import z from "zod";

// validation rules for password
const passwordSchema = z
	.string()
	.min(8, "Password must be at least 8 characters long")
	.regex(/[A-Z]/, "Password must include at least one uppercase letter")
	.regex(/[a-z]/, "Password must include at least one lowercase letter")
	.regex(/[0-9]/, "Password must include at least one number")
	.regex(/[@$!%*?&]/, "Password must include at least one special character");

// validation rules for username
const usernameSchema = z
	.string()
	.min(6, "Username must be at least 6 characters long")
	.max(20, "Username must not exceed 20 characters")
	.regex(
		/^[a-zA-Z0-9_-]+$/,
		"Username can only contain letters, numbers, hyphens, and underscores",
	)
	.refine(value => !/^\d+$/.test(value), {
		message: "Username cannot be only numbers",
	})
	.refine(value => !/[@$!%*?&]/.test(value), {
		message: "Username cannot contain special characters like @$!%*?&",
	});

// validation rules for login
export const loginSchema = z.object({
	email: z.email("Invalid email format"),
	password: z.string().min(1, "Password is required"),
});

// validation rules for register
export const registerSchema = z.object({
	first_name: usernameSchema,
	last_name: usernameSchema,
	email: z.email("Invalid email format"),
	phone: z.string(),
	password: passwordSchema,
	roleName: z.string(),
});

export const resetSchema = z.object({
	email: z.email("Invalid email format"),
	otp: z.string(),
	newPassword: passwordSchema,
});

export type RegisterBody = z.infer<typeof registerSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
export type ResetBody = z.infer<typeof resetSchema>;
