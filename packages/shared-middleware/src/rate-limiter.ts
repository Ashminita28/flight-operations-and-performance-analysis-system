import { MESSAGES } from "@package/shared-utils";
import rateLimit from "express-rate-limit";
export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: MESSAGES.TOO_MANY_REQUESTS,
});
