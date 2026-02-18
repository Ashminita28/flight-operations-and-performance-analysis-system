import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Aviation System APIs",
			version: "1.0.0",
			description: "Authentication and Flight APIs",
		},
		servers: [
			{
				url: "http://localhost:4000/api",
			},
		],
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
