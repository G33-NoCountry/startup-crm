import swaggerDocs from "swagger-jsdoc";
import schemas from "./schemas";
import { env } from "process";
import { appConfig } from "../config/app.config";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Startup CRM API Documentation',
            version: '1.0.0',
            description: "API diseñada para gestionar los módulos principales del Startup CRM, incluyendo autenticación mediante JWT, administración de usuarios, manejo de clientes, operaciones comerciales y recursos internos. Provee endpoints seguros y estructurados que permiten interactuar con las funcionalidades centrales del sistema, garantizando integridad, escalabilidad y consistencia en las operaciones.",
        },
        servers: [
            {
                url: `http://localhost:${appConfig.port}`,
                description: "Servidor de desarrollo",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Autenticación con JWT. Enviar token en el header Authorization: Bearer <token>",
                },
            },
            schemas: schemas,
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['src/controllers/**.ts'],
};


export default swaggerDocs(options);