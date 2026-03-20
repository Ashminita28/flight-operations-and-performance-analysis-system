import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
 
export const createSwaggerSpec = (serviceName: string, basePath: string) => {
  return swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: `${serviceName} API`,
        version: "1.0.0",
      },
      servers: [
        {
          url: basePath,
        },
      ],
    },
 
    apis: [
      path.join(process.cwd(), "src/routes/**/*.ts"), 
      path.join(process.cwd(), "dist/routes/**/*.js"), 
    ],
  });
};