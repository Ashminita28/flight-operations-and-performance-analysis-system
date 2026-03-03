import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { initializeModels } from "@package/shared-database";

const start = async () => {
	await initializeModels();
	app.listen(3005, () => {
		console.log("performance service  running at port 3005");
	});
};
start();
