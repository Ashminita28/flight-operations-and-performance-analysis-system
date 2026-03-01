import dotenv from "dotenv";
dotenv.config();
import { initializeModels } from "@package/shared-database";

import app from "./app";

const start = async () => {
	await initializeModels();
	app.listen(3002, () => {
		console.log("Aircraft service running on port 3002");
	});
};
start();
