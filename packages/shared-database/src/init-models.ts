import sequelize from "./sequelize-connection";
import { setupAssociations } from "./models/index";
import { logger } from "@package/shared-config";

export async function initializeModels() {
	setupAssociations();
	return sequelize
		.authenticate()
		.then(() => logger.info("DATABASE CONNECTED SUCCESSFULLY !!!!"))
		.catch(err => {
			console.error("Connection error:", err);
			process.exit(1);
		});
}
