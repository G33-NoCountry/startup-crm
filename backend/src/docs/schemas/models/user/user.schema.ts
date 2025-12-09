export default {
    FullUser: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            full_name: { type: "string", example: "Juan Perez" },
            email: { type: "string", example: "juan@mail.com" },
            role: {
                type: "string",
                example: "Admin",
                description: "Rol que permite acceso a diferentes recursos",
            },
            status: {
                type: "boolean",
                example: true,
                description: "Estado del usuario",
            },
            avatar_color: {
                type: "string",
                example: "red",
                description: "Color del avatar en formato hexadecimal",
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