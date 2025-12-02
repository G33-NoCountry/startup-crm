export default {
    CreateTagRequest: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "Nueva tag personalizada",
                description: "Nombre para la Tag"
            },
            color: {
                type: "string",
                example: "green",
                description: "Color para la Tag"
            }
        },
    },
    UpdateTagRequest: {
        type: "object",
        properties: {
            title: {
                type: "string",
                example: "Tag modificada",
                description: "Nuevo nombre para la Tag"
            },
            color: {
                type: "string",
                example: "blue",
                description: "Nuevo color para la Tag"
            }
        },
    },


};