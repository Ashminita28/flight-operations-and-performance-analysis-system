import * as repo from "../repositories/passwordReset-repository";
import { sendEmail } from "../utils/mail";
import bcrypt from "bcrypt";
import User from "../models/user";

// 5.forgot password service
export const forgotPasswordService = async (email: string) => {
	const otp = Math.floor(100000 + Math.random() * 900000).toString();

	const expires = new Date(Date.now() + 10 * 60 * 1000);

	await repo.createOtp(email, otp, expires);

	await sendEmail(email, "Password Reset OTP", `your otp is ${otp}`);

	return { message: "OTP sent to email" };
};

// 6.reset password service
export const resetPasswordService = async (
	email: string,
	otp: string,
	newPassword: string,
) => {
	const record: any = await repo.findOtp(email, otp);
	if (!record || new Date() > record.expiresAt) {
		throw new Error("Invalid or expired OTP");
	}

	const hashed = await bcrypt.hash(newPassword, 10);

	await User.update({ password: hashed }, { where: { email } });

	await repo.deleteOtp(email);

	return { message: "Password reset successful" };
};
