import swaggerJsdoc from "swagger-jsdoc";

export const createSwaggerSpec = (serviceName: string, port: number) => {
	return swaggerJsdoc({
		definition: {
			openapi: "3.0.0",
			info: {
				title: `${serviceName} API`,
				version: "1.0.0",
			},
			servers: [
				{
					url: `http://localhost:${port}`,
				},
			],
		},
		apis: ["dist/routes/**/*.js"],
	});
};
