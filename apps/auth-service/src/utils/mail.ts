import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to: string, subject: string, text: string) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		pool: true,
		maxConnections: 5,
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject,
		text,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent:", info.response);
	} catch (error) {
		console.log("Error:", error);
	}
};
