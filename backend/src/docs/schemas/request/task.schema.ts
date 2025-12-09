export default {
    CreateTaskRequest: {
        type: "object",
        properties: {
            title: { type: "string", example: "Subir documentos" },
            deal_id: { type: "integer", example: 4 },
            start_date: {
                type: "string",
                format: "date-time",
                example: "2025-12-15T17:00:00Z",
                description: "Fecha y hora de inicio de la Task",
            },
            due_date: {
                type: "string",
                format: "date-time",
                example: "2025-12-17T17:00:00Z",
                description: "Fecha y hora de vencimiento de la Task",
            },
            color: {
                type: "string",
                example: "indigo",
                description: "Color de la Task",
            },
        },
        required: ["title", "start_date", "due_date", "color"],
    },
    UpdateTaskRequest: {
        type: "object",
        properties: {
            title: { type: "string", example: "Subir documentos" },
            start_date: {
                type: "string",
                format: "date-time",
                example: "2025-12-15T17:00:00Z",
                description: "Fecha y hora de inicio de la Task",
            },
            due_date: {
                type: "string",
                format: "date-time",
                example: "2025-12-17T17:00:00Z",
                description: "Fecha y hora de vencimiento de la Task",
            },
            color: {
                type: "string",
                example: "indigo",
                description: "Color de la Task",
            },
            status: { type: "boolean", example: false, description: "Estado de la Task" },
        },
    },
};