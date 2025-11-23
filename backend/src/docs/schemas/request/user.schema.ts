export default {
    UpdateUserRequest: {
        type: "object",
        properties: {
            full_name: {
                type: "string",
                example: "Juan Perez",
                description: "Nombre completo del usuario"
            },
            email: {
                type: "string",
                example: "example@mail.com",
                format: "email",
                description: "Email del usuario"
            }
        },
    },


};