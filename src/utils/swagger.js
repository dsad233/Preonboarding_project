import swaggerUi from "swagger-ui-express";
import swaggereJsdoc from "swagger-jsdoc";

const options = {
    swaggerDefinition: {
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost:3300',
        basePath: '/'
    },
    apis: ['./routes/*.js', './src/utils/swagger/*js']
};

const specs = swaggereJsdoc(options);

const swagger = {
    swaggerUi,
    specs
};

export default swagger;