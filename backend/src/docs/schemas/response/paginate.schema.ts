export default {
    PaginateUser: {
        type: "object",
        properties: {
            items: {
                type: "array",
                example: [
                    {
                        "id": 2,
                        "full_name": "User two mod",
                        "email": "user2@mail.com",
                        "role": "Agente",
                        "status": true,
                        "avatar_color": "4e9480",
                        "created_at": "2025-11-21T04:57:04.000Z",
                        "updated_at": "2025-11-21T04:59:28.000Z"
                    },
                    {
                        "id": 3,
                        "full_name": "User three",
                        "email": "user3@mail.com",
                        "role": "Manager",
                        "status": true,
                        "avatar_color": "a24bbd",
                        "created_at": "2025-11-21T04:57:04.000Z",
                        "updated_at": "2025-11-21T04:57:04.000Z"
                    }
                ]
            },
            total_count: {
                type: "integer",
                example: 4,
            },
            paginate_info: {
                type: "object",
                example: {
                    "has_next": true,
                    "has_previous": false,
                    "next_cursor": "WzNd",
                    "prev_cursor": null
                },
                properties: {
                    has_next: {
                        type: "boolean",
                        example: true,
                    },
                    has_previous: {
                        type: "boolean",
                        example: false,
                    },
                    next_cursor: {
                        type: "string",
                        example: "WzNd",
                    },
                    prev_cursor: {
                        type: "string|null",
                        example: null,
                    },
                }
            }
        }
    },
    PaginateContact: {
        type: "object",
        properties: {
            items: {
                type: "array",
                example: [
                    {
                        "id": 1,
                        "full_name": "Contact1",
                        "email": null,
                        "phone": "+541122222222",
                        "created_at": "2025-11-22T23:32:03.000Z",
                        "updated_at": "2025-11-22T23:32:03.000Z",
                        "tags": [
                            {
                                "id": 3,
                                "title": "Cliente Referido",
                                "color": "gray"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "full_name": "Contact2",
                        "email": "contact2@mail.com",
                        "phone": "+541111111111",
                        "created_at": "2025-11-22T23:32:03.000Z",
                        "updated_at": "2025-11-22T23:32:03.000Z",
                        "tags": [
                            {
                                "id": 1,
                                "title": "Bloqueado para WA",
                                "color": "indigo"
                            }
                        ]
                    }
                ]
            },
            total_count: {
                type: "integer",
                example: 4,
            },
            paginate_info: {
                type: "object",
                example: {
                    "has_next": true,
                    "has_previous": false,
                    "next_cursor": "WzNd",
                    "prev_cursor": null
                },
                properties: {
                    has_next: {
                        type: "boolean",
                        example: true,
                    },
                    has_previous: {
                        type: "boolean",
                        example: false,
                    },
                    next_cursor: {
                        type: "string",
                        example: "WzNd",
                    },
                    prev_cursor: {
                        type: "string|null",
                        example: null,
                    },
                }
            }
        }
    },
    PaginateConversation: {
        type: "object",
        properties: {
            items: {
                type: "array",
                example: [
                    {
                        id: 3,
                        contact_id: 3,
                        status: false,
                        channel: "whatsapp",
                        last_interaction: null,
                        created_at: "2025-11-27T19:03:42.000Z",
                        updated_at: "2025-11-27T19:03:42.000Z"
                    },
                    {
                        id: 7,
                        contact_id: 3,
                        status: false,
                        channel: "email",
                        last_interaction: "2025-11-27T19:03:42.000Z",
                        created_at: "2025-11-27T19:03:42.000Z",
                        updated_at: "2025-11-27T19:03:42.000Z"
                    }
                ]
            },
            total_count: {
                type: "integer",
                example: 2,
            },
            paginate_info: {
                type: "object",
                example: {
                    "has_next": false,
                    "has_previous": false,
                    "next_cursor": null,
                    "prev_cursor": null
                },
                properties: {
                    has_next: {
                        type: "boolean",
                        example: false,
                    },
                    has_previous: {
                        type: "boolean",
                        example: false,
                    },
                    next_cursor: {
                        type: "string",
                        example: null,
                    },
                    prev_cursor: {
                        type: "string",
                        example: null,
                    },
                }
            }
        }
    },
    PaginateMessages: {
        type: "object",
        properties: {
            items: {
                type: "array",
                example: [
                    {
                        id: 15,
                        conversation_id: 6,
                        sender_type: "User",
                        sender_id: 3,
                        content: "Sí, confirmado. ¿La reunión es por videollamada?.",
                        created_at: "2025-11-03T19:30:14.000Z",
                        updated_at: "2025-11-03T19:30:14.000Z",
                        sender: {
                            id: 3,
                            full_name: "Jimena Lopez",
                            email: "manager@manager.com"
                        }
                    },
                    {
                        id: 14,
                        conversation_id: 6,
                        sender_type: "Contact",
                        sender_id: 1,
                        content: "Dale, te reservo un espacio a las 15:00. ¿Te queda bien?.",
                        created_at: "2025-11-03T19:00:14.000Z",
                        updated_at: "2025-11-03T19:00:14.000Z",
                        sender: {
                            id: 1,
                            full_name: "Sofía Rodríguez",
                            email: "sofia.rodriguez.dev@gmail.com",
                            phone: "+541189215288"
                        }
                    },
                    {
                        id: 13,
                        conversation_id: 6,
                        sender_type: "Contact",
                        sender_id: 1,
                        content: "Sí, podría mañana por la tarde.",
                        created_at: "2025-11-03T18:00:14.000Z",
                        updated_at: "2025-11-03T18:00:14.000Z",
                        sender: {
                            id: 1,
                            full_name: "Sofía Rodríguez",
                            email: "sofia.rodriguez.dev@gmail.com",
                            phone: "+541189215288"
                        }
                    },
                ]
            },
            paginate_info: {
                type: "object",
                example: {
                    "has_next": false,
                },
                properties: {
                    has_next: {
                        type: "boolean",
                        example: false,
                    },
                }
            }
        }
    },
    PaginateTasks: {
        type: "object",
        properties: {
            items: {
                type: "array",
                example: [
                    {
                        id: 2,
                        user_id: 1,
                        deal_id: null,
                        contact_id: 3,
                        title: "Subir documentos",
                        due_date: "2025-11-30T04:23:04.000Z",
                        status: true,
                        created_at: "2025-11-30T04:23:04.000Z",
                        updated_at: "2025-11-30T04:23:04.000Z"
                    },
                    {
                        id: 7,
                        user_id: 1,
                        deal_id: null,
                        contact_id: 2,
                        title: "Reorganizar estructura de carpetas del proyecto",
                        due_date: "2025-11-30T04:23:04.000Z",
                        status: true,
                        created_at: "2025-11-30T04:23:04.000Z",
                        updated_at: "2025-11-30T04:23:04.000Z"
                    }
                ]
            },
            paginate_info: {
                type: "object",
                example: {
                    has_next: false,
                    has_previous: false,
                    next_cursor: null,
                    prev_cursor: null
                },
                properties: {
                    has_next: {
                        type: "boolean",
                        example: false,
                    },
                    has_previous: {
                        type: "boolean",
                        example: false,
                    },
                    next_cursor: {
                        type: "string",
                        example: null,
                    },
                    prev_cursor: {
                        type: "string",
                        example: null,
                    },
                }
            }
        }
    },
    PaginateTemplates: {
        type: "object",
        properties: {
            items: {
                type: "array",
                example: [
                    {
                        id: 1,
                        title: "Confirmar propuesta",
                        channel: "whatsapp",
                        content: "Hola, ¿podemos avanzar con la propuesta enviada?",
                        status: true
                    },
                    {
                        id: 2,
                        title: "Recordatorio de reunión",
                        channel: "email",
                        content: "Te recuerdo la reunión pautada para mañana a las 10 AM.",
                        status: false
                    },
                    {
                        id: 3,
                        title: "Seguimiento de cotización",
                        channel: "whatsapp",
                        content: "¿Tuviste oportunidad de revisar la cotización que envié?",
                        status: true
                    }
                ]
            },
            paginate_info: {
                type: "object",
                example: {
                    has_next: false,
                    has_previous: false,
                    next_cursor: null,
                    prev_cursor: null
                },
                properties: {
                    has_next: {
                        type: "boolean",
                        example: false,
                    },
                    has_previous: {
                        type: "boolean",
                        example: false,
                    },
                    next_cursor: {
                        type: "string",
                        example: null,
                    },
                    prev_cursor: {
                        type: "string",
                        example: null,
                    },
                }
            }
        }
    },
};
