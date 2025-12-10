export default {
    FullMessage: {
        type: "object",
        properties: {
            id: { type: "integer", example: 2 },
            conversation_id: { type: "integer", example: 2 },
            content: { type: "string", example: "Mensaje de ejemplo" },
            sender_type: { type: "string", enum: ["User", "Contact"], example: "User" },
            sender_id: { type: "integer", example: 2 },
            channel: { type: "string", enum: ["whatsapp", "email"], example: "whatsapp" },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T17:00:00Z",
                description: "Fecha y hora de la creación del registro",
            },
            updated_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-30T17:00:00Z",
                description: "Fecha y hora de modificación del registro",
            },
        },
    },

};