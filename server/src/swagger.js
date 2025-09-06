import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "SommelIO API",
			version: "1.0.0",
			description: "SommelIO API docs",
		},
		servers: [
			{
				url: "https://sommelio.vercel.app",
				description: "Production",
			},
			{
				url: "http://localhost:3001",
				description: "Development",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ["./src/docs/*.js"],
};

const specs = swaggerJsdoc(options);

export default { specs, swaggerUi };
