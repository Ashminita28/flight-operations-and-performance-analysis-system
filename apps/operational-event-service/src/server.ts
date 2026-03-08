import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { initializeModels } from "@package/shared-database";

const PORT = process.env.PORT;
const start = async () => {
	await initializeModels();
	app.listen(PORT, () => {
		console.log("Operational event running at port 3004");
	});
};
start();
