import { Sequelize } from "sequelize";
import { validateEnv } from "@package/shared-config";

const env = validateEnv();

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
	host: env.DB_HOST,
	port: env.DB_PORT,
	dialect: "postgres",

	logging: false,

	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

export default sequelize;
