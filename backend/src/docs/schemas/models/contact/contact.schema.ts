export default {
    FullContact: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            full_name: { type: "string", example: "Juan Perez" },
            email: { type: "string", example: "juan@mail.com" },
            phone: {
                type: "string",
                example: "+541122334455",
                description: "Teléfono del contacto",
            },
            tags: {
                type: "array",
                example: [
                    {
                        id: 1,
                        title: "Bloqueado para WA",
                        color: "indigo"
                    }
                ]
            },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T17:00:00Z",
                description: "Fecha y hora de la creación del registro",
            },
            updated_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T17:00:00Z",
                description: "Fecha y hora de modificación del registro",
            },
        },
    },

};