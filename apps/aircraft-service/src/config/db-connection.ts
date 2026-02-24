import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
	process.env.DB_NAME || "aviation_db",
	process.env.DB_USER || "aviation_user",
	process.env.DB_PASSWORD || "aviation_pass",
	{
		host: process.env.DB_HOST || "localhost",
		port: Number(process.env.DB_PORT) || 5432,
		dialect: "postgres",
	},
);
console.log("DB HOST:", process.env.DB_HOST);
console.log("DB USER:", process.env.DB_USER);

export default sequelize;
