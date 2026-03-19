import { PasswordReset } from "@package/shared-database";
import bcrypt from "bcrypt";

export const createOtp = async (
	email: string,
	otp: string,
	expiresAt: Date,
) => {
	const hashedOtp = await bcrypt.hash(otp, 10);

	const record = await PasswordReset.create({
		email,
		otp: hashedOtp,
		expiresAt,
	});

	return record?.dataValues;
};

export const findOtp = async (email: string, otp: string) => {
	const record: any = await PasswordReset.findOne({
		where: { email },
	});

	if (!record) return null;

	const isValid = await bcrypt.compare(otp, record.otp);
	if (!isValid) return null;

	return record.dataValues;
};

export const deleteOtp = async (email: string) => {
	const deleteotp = await PasswordReset.destroy({ where: { email } });
	return deleteotp;
};
