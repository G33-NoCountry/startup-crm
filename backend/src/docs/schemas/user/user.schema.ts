export default {
    FullUser: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            full_name: { type: "string", example: "Juan Perez" },
            email: { type: "string", example: "juan@mail.com" },
            role: { type: "string", example: "Admin" },
            status: { type: "boolean", example: false },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T17:00:00Z",
            },
            updated_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T17:00:00Z",
            },
        },
    },

};