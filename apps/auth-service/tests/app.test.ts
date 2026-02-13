import { describe, it, expect } from "vitest";
import app from "../src/app";

// 1.error path testing
describe("happy health test", () => {
	it("respond for unknowmn route", async () => {
		const res = await fetch("http://localhost:3000/");
		expect(res.status).toBe(200);
	});
});
