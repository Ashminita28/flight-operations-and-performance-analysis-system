import dotenv from "dotenv";
dotenv.config();

import sequelize from "@repo/shared-databse";
import app from "./app";
import User from "./models/user";
import Role from "./models/role";
import { Permission } from "./models/association";

const start = async () => {
	try {
		console.log("USER permissions:", Object.keys(User.associations));
		console.log("ROLE permissions:", Object.keys(Role.associations));
		console.log(
			"PERMISSION permissions:",
			Object.keys(Permission.associations),
		);
		await sequelize.authenticate();
		console.log("DB connected");
		app.listen(3000, () => {
			console.log("Auth service running at 3000");
		});
	} catch (err) {
		console.error("error occurred:", err);
		process.exit(1);
	}
};

start();
