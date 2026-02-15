// import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import sequelize from "@repo/shared-databse/dist/server";
import app from "./app";
import "./models/user";

// const app = express();

// app.get("/", (req, res) => {
// 	res.status(200).json({ status: "success" });
// });

const start = async () => {
	try {
		await sequelize.authenticate();
		console.log("DB synced");
		app.listen(3000, () => {
			console.log("Auth service running at 3000");
		});
	} catch (err) {
		console.error("erroroccurred:", err);
	}
};

start();
