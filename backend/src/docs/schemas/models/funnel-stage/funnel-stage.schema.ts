export default {
    FullFunnelStage: {
        type: "object",
        properties: {
            id: { type: "integer", example: 2 },
            title: { type: "string", example: "Contactado" },
            sort_order: { type: "integer", example: 3 },
            is_closed: { type: "boolean", example: false },
        },
    },
    ListFunnelStage: {
        type: "array",
        example: [
            {
                id: 5,
                title: "Cerrado-Ganado",
                sort_order: 1,
                is_closed: true
            },
            {
                id: 1,
                title: "Nuevo",
                sort_order: 2,
                is_closed: false
            },
            {
                id: 6,
                title: "Cerrado-Perdido",
                sort_order: 3,
                is_closed: true
            },
            {
                id: 2,
                title: "Contactado",
                sort_order: 4,
                is_closed: false
            },
            {
                id: 3,
                title: "Interesado",
                sort_order: 5,
                is_closed: false
            },
            {
                id: 4,
                title: "Propuesta enviada",
                sort_order: 6,
                is_closed: false
            }
        ]
    },

};