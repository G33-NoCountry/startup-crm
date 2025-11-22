export default {
    Unauthorized: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "No está autenticado" },
        },
    },
    Authenticated: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Ya existe una sesión activa" },
        },
    },
    Forbidden: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "No tiene permiso para acceder" },
        },
    },
    BadRequest: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Errores de validación" },
            errors: {
                type: "array",
                description: "Listado de errores de validación",
                items: {
                    type: "object",
                    properties: {
                        type: {
                            type: "string",
                            example: "field",
                        },
                        value: {
                            type: "string",
                            example: "example.com",
                        },
                        msg: {
                            type: "string",
                            example: "email no válido",
                        },
                        path: {
                            type: "string",
                            example: "email",
                        },
                        location: {
                            type: "string",
                            example: "body",
                        },
                    },
                },
            }
        }
    },
    InternalServerError: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Internal Server Error" },
        },
    },

    NotFound: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "No se encontró" },
        },
    },

    UnprocessableEntity: {
        type: "object",
        properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Unprocessable entity" },
        },
    },

};