import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Backend API",
      version: "1.0.0",
      description: "API documentation for ecommerce backend"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./src/modules/**/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(options);