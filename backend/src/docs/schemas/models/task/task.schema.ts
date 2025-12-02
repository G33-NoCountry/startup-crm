export default {
    FullTask: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Subir documentos" },
            user_id: { type: "integer", example: 3 },
            contact_id: { type: "integer", example: 2 },
            deal_id: { type: "integer", example: 4 },
            status: {
                type: "boolean",
                example: false,
                description: "Estado de la tarea: `false`=`pendiente`|`true`=`completada`",
            },
            due_date: {
                type: "string",
                format: "date-time",
                example: "2025-12-15T17:00:00Z",
                description: "Fecha y hora de vencimiento de la Task",
            },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2025-12-05T17:00:00Z",
                description: "Fecha y hora de la creación del registro",
            },
            updated_at: {
                type: "string",
                format: "date-time",
                example: "2025-12-05T17:00:00Z",
                description: "Fecha y hora de modificación del registro",
            },
        },
    },

};