require("dotenv").config();

module.exports = {
	development: {
		username: process.env.DB_USER || "aviation_user",
		password: process.env.DB_PASSWORD || "aviation_pass",
		database: process.env.DB_NAME || "aviation_db",
		host: process.env.DB_HOST || "localhost",
		port: Number(process.env.DB_PORT),
		dialect: "postgres",
	},
};
