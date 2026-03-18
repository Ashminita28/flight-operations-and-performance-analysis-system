import pinoHttp from "pino-http";
import { logger } from "@package/shared-config";

export const httpLogger = pinoHttp({
	logger,
});
