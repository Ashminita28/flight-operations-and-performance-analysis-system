import dotenv from "dotenv";
dotenv.config;
import app from "./app";
import { initializeModels } from "@package/shared-database";

const start = async () => {
	await initializeModels();
	app.listen(3001, () => {
		console.log("flight service unning on port 3001");
	});
};

start();
