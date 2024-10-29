// swagger.js

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Documentation for your API',
    },
    servers: [
        {
            url: 'http://localhost:4000', // Your local server URL
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Path to the API docs
    apis: ['./routes/*.js', './models/*.js'], // Adjust the path to your routes and models
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = {swaggerUi, swaggerSpec};
