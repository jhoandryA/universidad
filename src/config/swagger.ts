import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Personas documentación',
            version: '1.0.0',
            description: 'API para la gestión de personas',
        },
        servers: [
            { url: 'http://localhost:3000', description: 'Servidor local' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Rutas a los archivos donde se encuentran los endpoints
});