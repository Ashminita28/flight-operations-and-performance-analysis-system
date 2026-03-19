import pinoHttp from "pino-http";
import { logger } from "@package/shared-config";

export const httpLogger = pinoHttp({
	logger,

	serializers: {
		req(req) {
			return {
				method: req.method,
				url: req.url,
			};
		},

		res(res) {
			return {
				statusCode: res.statusCode,
			};
		},
	},
});
