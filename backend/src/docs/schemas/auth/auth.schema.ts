export default {
    RegisterRequest: {
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
            },
            password: {
                type: "string",
                minLenght: 8,
                maxLenght: 60,
                example: "12345678Mn@",
                description: "Contraseña del usuario"
            },
            password_confirmation: {
                type: "string",
                minLenght: 8,
                maxLenght: 60,
                example: "12345678Mn@",
                description: "Confirmación de contraseña"
            },
        },
        required: ["full_name", "email", "password", "password_confirmation"],
    },

};