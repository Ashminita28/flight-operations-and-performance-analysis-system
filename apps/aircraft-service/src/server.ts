import dotenv from "dotenv";
dotenv.config();
import { initializeModels } from "@package/shared-database";
import app from "./app";

const PORT = process.env.PORT;
const start = async () => {
	await initializeModels();
	app.listen(PORT, () => {
		console.log("Aircraft service running on port 3002");
	});
};
start();
