const path = require("path");

require("dotenv").config({
	path: path.resolve(__dirname, "../../../../.env"),
});

module.exports = {
	development: {
		username: process.env.DB_USER || "aviation_user",
		password: process.env.DB_PASSWORD || "aviation_pass",
		database: process.env.DB_NAME || "aviation_db",
		host: process.env.DB_HOST || "localhost",
		port: Number(process.env.DB_PORT),
		dialect: "postgres",
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT),
		dialect: "postgres",
	},
};
