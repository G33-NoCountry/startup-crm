export default {
    AdminRegisterUserRequest: {
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
            role: {
                type: "string",
                enum: ["Admin", "Agente", "Manager"],
                example: "Manager",
                description: "Role que cumplirá en la aplicación"
            },
        },
        required: ["full_name", "email", "password", "role"],
    },
    AdminUpdateUserRequest: {
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
            role: {
                type: "string",
                enum: ["Admin", "Agente", "Manager"],
                example: "Manager",
                description: "Role que cumplirá en la aplicación"
            },
            status: {
                type: "boolean",
                example: false,
                description: "Estado del usuario",
            },
        },
    },


};