import express, { Request, Response } from "express";

const app = express();

app.listen(3000, () => {
	console.log("Auth service running at 3000");
});
