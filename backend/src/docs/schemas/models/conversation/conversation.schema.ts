export default {
    FullConversation: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            contact_id: { type: "integer", example: 2 },
            status: { type: "boolean", example: true },
            channel: {
                type: "string",
                enum: ["whatsapp", "email"],
                example: "whatsapp",
                description: "Medio por el cual se realiza la conversación"
            },
            last_interaction: {
                type: "string",
                format: "date-time",
                example: "2024-01-30T17:00:00Z",
                description: "Fecha y hora de la última interacción",
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
                example: "2024-01-30T17:00:00Z",
                description: "Fecha y hora de modificación del registro",
            },
        },
    },

};