import dotenv from "dotenv";
dotenv.config();
import app from "./app";

import { initializeModels } from "@package/shared-database";

const start = async () => {
	await initializeModels();
	app.listen(3000, () => {
		console.log("auth service unning on port 3000");
	});
};

start();
