export default {
    CreateFunnelRequest: {
        type: "object",
        properties: {
            title: { type: "string", example: "Contactado" },
            is_closed: { type: "boolean", example: false },
        },
        required: ["title", "is_closed"]
    },
    UpdateFunnelRequest: {
        type: "object",
        properties: {
            title: { type: "string", example: "Contactado" },
            is_closed: { type: "boolean", example: false },
        },
    },
    ReorderFunnelRequest: {
        type: "object",
        properties: {
            funnels: {
                type: "array",
                properties: {
                    id: { type: "integer", example: 2 },
                    sort_order: { type: "integer", example: 4 },
                },
                example: [
                    {
                        id: 1,
                        sort_order: 2
                    },
                    {
                        id: 2,
                        sort_order: 4
                    },
                    {
                        id: 3,
                        sort_order: 5
                    },
                    {
                        id: 4,
                        sort_order: 6
                    },
                    {
                        id: 5,
                        sort_order: 1
                    },
                    {
                        id: 6,
                        sort_order: 3
                    }
                ]
            }
        },
    },

};