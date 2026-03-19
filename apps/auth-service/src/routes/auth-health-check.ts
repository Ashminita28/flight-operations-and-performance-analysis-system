import { HTTP_STATUS, sendResponse } from "@package/shared-utils";
import { Router } from "express";

export const authHealth: Router = Router();

authHealth.get("/", (req, res) => {
	return sendResponse({ res, statusCode: HTTP_STATUS.OK, success: true });
});
