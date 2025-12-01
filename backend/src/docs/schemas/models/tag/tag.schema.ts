export default {
    TagList: {
        type: "array",
        example: [
            {
                id: 1,
                title: "Baja Interacción",
                color: "indigo"
            },
            {
                id: 2,
                title: "Bloqueado para WA",
                color: "pink"
            },
            {
                id: 3,
                title: "Cliente Referido",
                color: "gray"
            },
            {
                id: 3,
                title: "Riesgo de Abandono",
                color: "yellow"
            }
        ],
        properties: {
            id: { type: "integer" },
            title: { type: "string" },
            color: { type: "string" },
        },
    },

};