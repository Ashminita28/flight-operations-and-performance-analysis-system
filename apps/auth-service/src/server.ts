import dotenv from "dotenv";
dotenv.config();

import sequelize from "@repo/shared-databse/dist/server";
import app from "./app";
import "./models/user";

const start = async () => {
	try {
		await sequelize.authenticate();
		console.log("DB connected");
		app.listen(3000, () => {
			console.log("Auth service running at 3000");
		});
	} catch (err) {
		console.error("error occurred:", err);
	}
};

start();
