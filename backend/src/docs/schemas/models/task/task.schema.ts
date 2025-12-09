export default {
    FullTask: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Subir documentos" },
            user_id: { type: "integer", example: 3 },
            contact_id: { type: "integer", example: 2 },
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
            status: {
                type: "boolean",
                example: false,
                description: "Estado de la tarea: `false`=`pendiente`|`true`=`completada`",
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
                start_date: "2025-09-07T10:15:00.000Z",
                due_date: "2025-12-04T22:03:50.000Z",
                color: "red",
                status: false,
                created_at: "2025-12-05T22:03:50.000Z",
                updated_at: "2025-12-05T22:03:50.000Z"
            },
            {
                id: 2,
                title: "Subir documentos",
                start_date: "2025-12-03T22:03:50.000Z",
                due_date: "2025-12-06T22:03:50.000Z",
                color: "indigo",
                status: false,
                created_at: "2025-12-05T22:03:50.000Z",
                updated_at: "2025-12-05T22:03:50.000Z"
            },
            {
                id: 7,
                title: "Reorganizar estructura de carpetas del proyecto",
                start_date: "2025-09-05T22:03:50.000Z",
                due_date: "2025-09-07T22:03:50.000Z",
                color: "green",
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
            start_date: "2025-12-04T17:27:41.000Z",
            due_date: "2025-12-04T17:27:41.000Z",
            color: "indigo",
            contact: {
                id: 3,
                full_name: "Gabriela Prats"
            },
        },
    }

};