import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("Auth service running");
});

app.listen(3000, () => {
	console.log("Auth service running at 3000");
});
