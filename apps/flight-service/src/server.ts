import dotenv from "dotenv";
dotenv.config;
import app from "./app";
import sequelize from "@package/shared-database/dist/sequelize-connection";

const start = async () => {
	try {
		await sequelize.authenticate();
		console.log("DB connected");
		app.listen(3001, () => {
			console.log("flight service unning on port 3001");
		});
	} catch (err) {
		console.error("error occurred:", err);
		process.exit(1);
	}
};

start();
