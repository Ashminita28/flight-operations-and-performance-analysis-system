import sequelize from "./sequelize-connection";
import { setupAssociations } from "./models/index";

export async function initializeModels() {
	setupAssociations();
	return sequelize
		.authenticate()
		.then(() => console.log("DATABASE CONNECTED SUCCESSFULLY !!!!"))
		.catch(err => {
			console.error("Connection error:", err);
			process.exit(1);
		});
}
