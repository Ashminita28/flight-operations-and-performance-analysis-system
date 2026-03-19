import { HTTP_STATUS, sendResponse } from "@package/shared-utils";
import { Router } from "express";

export const performanceHealth: Router = Router();

performanceHealth.get("/", (req, res) => {
	return sendResponse({ res, statusCode: HTTP_STATUS.OK, success: true });
});
