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

};