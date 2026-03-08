import { PasswordReset } from "@package/shared-database";

export const createOtp = async (
	email: string,
	otp: string,
	expiresAt: Date,
) => {
	const createotp = await PasswordReset.create({ email, otp, expiresAt });
	return createotp?.dataValues;
};

export const findOtp = async (email: string, otp: string) => {
	const findotp = await PasswordReset.findOne({ where: { email, otp } });
	return findotp?.dataValues;
};

export const deleteOtp = async (email: string) => {
	const deleteotp = await PasswordReset.destroy({ where: { email } });
	return deleteotp;
};
