export default {
    CreateTaskRequest: {
        type: "object",
        properties: {
            title: { type: "string", example: "Subir documentos" },
            deal_id: { type: "integer", example: 4 },
            due_date: {
                type: "string",
                format: "date-time",
                example: "2025-12-15T17:00:00Z",
                description: "Fecha y hora de vencimiento de la Task",
            },
        },
        required: ["title", "due_date"],
    },
};