export default {
    TagList: {
        type: "array",
        example: [
            {
                id: 1,
                title: "Baja Interacción",
                color: "indigo",
                created_at: "2025-12-01T19:17:20.000Z",
                updated_at: "2025-12-01T19:23:26.000Z"
            },
            {
                id: 2,
                title: "Bloqueado para WA",
                color: "pink",
                created_at: "2025-12-01T19:17:20.000Z",
                updated_at: "2025-12-01T19:23:26.000Z"

            },
            {
                id: 3,
                title: "Cliente Referido",
                color: "gray",
                created_at: "2025-12-01T19:17:20.000Z",
                updated_at: "2025-12-01T19:23:26.000Z"

            },
            {
                id: 4,
                title: "Riesgo de Abandono",
                color: "yellow",
                created_at: "2025-12-01T19:17:20.000Z",
                updated_at: "2025-12-01T19:23:26.000Z"
            }
        ],
        properties: {
            id: { type: "integer" },
            title: { type: "string" },
            color: { type: "string" },
        },
    },
    FullTag: {
        type: "object",
        properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Baja Interacción" },
            color: { type: "string", example: "indigo" },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T17:00:00Z",
                description: "Fecha y hora de la creación del registro",
            },
            updated_at: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T17:00:00Z",
                description: "Fecha y hora de modificación del registro",
            },
        },
        example: {
            id: 1,
            title: "Baja Interacción",
            color: "indigo",
            created_at: "2025-12-01T19:17:20.000Z",
            updated_at: "2025-12-01T19:23:26.000Z"
        }
        ,
    },

};