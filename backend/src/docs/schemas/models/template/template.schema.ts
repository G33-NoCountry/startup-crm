export default {
    FullTemplate: {
        type: "object",
        properties: {
            id: { type: "integer", example: 2 },
            title: { type: "string", example: "Agradecimiento" },
            content: { type: "string", example: "¡Gracias por tu interés! Estoy para ayudarte en lo que necesites" },
            channel: { type: "string", enum: ["whatsapp", "email"], example: "whatsapp" },
            status: { type: "boolean", example: false },
            user_id: { type: "integer", example: 1 },
        },
    },

};