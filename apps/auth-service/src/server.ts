import express, { Request, Response } from "express";

const app = express();

app.get("/", (req, res) => {
	res.status(200).json({ status: "success" });
});

app.listen(3000, () => {
	console.log("Auth service running at 3000");
});
