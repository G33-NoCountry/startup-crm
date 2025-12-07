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
    TaskList: {
        type: "array",
        example: [
            {
                id: 1,
                title: "Llamar para confirmar propuesta",
                due_date: "2025-12-04T22:03:50.000Z",
                status: false,
                created_at: "2025-12-05T22:03:50.000Z",
                updated_at: "2025-12-05T22:03:50.000Z"
            },
            {
                id: 2,
                title: "Subir documentos",
                due_date: "2025-12-03T22:03:50.000Z",
                status: false,
                created_at: "2025-12-05T22:03:50.000Z",
                updated_at: "2025-12-05T22:03:50.000Z"
            },
            {
                id: 7,
                title: "Reorganizar estructura de carpetas del proyecto",
                due_date: "2025-09-05T22:03:50.000Z",
                status: false,
                created_at: "2025-12-05T22:03:50.000Z",
                updated_at: "2025-12-05T22:03:50.000Z"
            }
        ],
    },
    TaskRelationship: {
        type: "object",
        example: {
            id: 2,
            title: "Subir documentos",
            due_date: "2025-12-04T17:27:41.000Z",
            contact: {
                id: 3,
                full_name: "Gabriela Prats"
            }
        },
    }

};