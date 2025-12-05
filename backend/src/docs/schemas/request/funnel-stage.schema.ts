export default {
    CreateFunnelRequest: {
        type: "object",
        properties: {
            title: { type: "string", example: "Contactado" },
            is_closed: { type: "boolean", example: false },
        },
    },

};