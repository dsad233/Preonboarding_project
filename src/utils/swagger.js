import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        openapi : "3.0.0",
        info: {
            title: 'Preonboarding API',
            version: '1.0.0',
            description: 'Preonboarding API with express',
        },
        servers: [
            {
              url: 'http://localhost:3000',
            },
            {
              url : 'http://43.203.236.50:3000'
            }
          ],
        components : {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
    },
    apis: ['**/*.js']
};

const specs = swaggereJsdoc(options);

const swagger = {
    swaggerUi,
    specs
};

export default swagger;