import request from "supertest";
import app from "../src/app";

describe("happy health test", () => {
	it("respond for unknowmn route", async () => {
		const res = await request(app).get("/happy");
		expect(res.status).toBe(200);
	});
});
