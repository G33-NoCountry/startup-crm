export default {
    CreateTemplateRequest: {
        type: "object",
        properties: {
            title: { type: "string", example: "Agradecimiento" },
            channel: { type: "string", enum: ["whatsapp", "email"], example: "whatsapp" },
            content: { type: "string", example: "¡Gracias por tu interés! Estoy para ayudarte en lo que necesites." },
            status: { type: "boolean", example: false },
        },
        required: ["title", "channel", "content", "status"]
    },
};