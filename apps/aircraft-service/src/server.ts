import dotenv from "dotenv";
dotenv.config();
import sequelize from "./config/db-connection";

import app from "./app";

const start = async () => {
	try {
		await sequelize.authenticate();
		console.log("DB connected");
		app.listen(3002, () => {
			console.log("Aircraft service running on port 3002");
		});
	} catch (err) {
		console.error("error occurred:", err);
		process.exit(1);
	}
};

start();
