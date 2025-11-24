export default {
    RegisterContactRequest: {
        type: "object",
        properties: {
            full_name: {
                type: "string",
                example: "Juan Perez",
                description: "Nombre completo del contacto"
            },
            email: {
                type: "string",
                example: "example@mail.com",
                format: "email",
                description: "Email del contacto"
            },
            phone: {
                type: "string",
                example: "+541122334455",
                description: "Teléfono del contacto"
            },
        },
        required: ["full_name", "email"],
    },
    UpdateContactRequest: {
        type: "object",
        properties: {
            full_name: {
                type: "string",
                example: "Juan Perez",
                description: "Nombre completo del contacto"
            },
            email: {
                type: "string",
                example: "example@mail.com",
                format: "email",
                description: "Email del contacto"
            },
            phone: {
                type: "string",
                example: "+541122334455",
                description: "Teléfono del contacto"
            },
        },
    },
};