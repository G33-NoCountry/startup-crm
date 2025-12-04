export default {
    Metrics: {
        type: "object",
        properties: {
            metrics: {
                type: "object",
                properties: {
                    total_active_contacts: {
                        type: "integer",
                        example: 1,
                        description: "Cantidad total de contactos activos"
                    },
                    sent_messages: {
                        type: "object",
                        description: "Cantidad total de mensajes enviados",
                        properties: {
                            overall: {
                                type: "integer",
                                example: 50,
                                description: "Cantidad total de mensajes enviados en el sistema",
                            },
                            by_user: {
                                type: "integer",
                                example: 19,
                                description: "Cantidad total de mensajes enviados por el usuario",
                            },
                        }
                    },
                    response_rate: {
                        type: "decimal",
                        example: 42.4,
                        description: "Tasa de respuesta"
                    },
                    pipeline_value: {
                        type: "integer",
                        example: 379302,
                        description: "Valor total de las deals"
                    },
                }
            }
        },
    },

    FunnelProgress: {
        type: "object",
        properties: {
            funnel_progress: {
                type: "object",
                properties: {

                    new: {
                        type: "integer",
                        example: 1,
                        description: "Cantidad de deals en estado 'Nuevo'"
                    },
                    contacted: {
                        type: "integer",
                        example: 1,
                        description: "Cantidad de deals en estado 'Contactado'"
                    },
                    interested: {
                        type: "integer",
                        example: 1,
                        description: "Cantidad de deals en estado 'Interesado'"
                    },
                    submitted_proposal: {
                        type: "integer",
                        example: 1,
                        description: "Cantidad de deals en estado 'Propuesta enviada'"
                    },
                    closed_won: {
                        type: "integer",
                        example: 1,
                        description: "Cantidad de deals en estado 'Cerrado-Ganado'"
                    },
                    closed_lost: {
                        type: "integer",
                        example: 1,
                        description: "Cantidad de deals en estado 'Cerrado-Perdido'"
                    },
                }
            }
        },
    },
    PendingTasks: {
        type: "object",
        properties: {
            pending_tasks: {
                type: "array",
                items: {
                    $ref: '#/components/schemas/TaskRelationship'
                }
            }
        },
    },
    RecentActivity: {
        type: "object",
        example: {
            recent_activity: {
                whatsapp: [
                    {
                        id: 13,
                        last_interaction: "2025-11-18T19:55:13.000Z",
                        messages: [
                            {
                                id: 34,
                                content: "Te escucho."
                            }
                        ],
                        contact: {
                            id: 5,
                            full_name: "Laura Benítez"
                        }
                    },
                    {
                        id: 16,
                        last_interaction: "2025-11-11T09:32:11.000Z",
                        messages: [
                            {
                                id: 39,
                                content: "Dale, en un rato te mando."
                            }
                        ],
                        contact: {
                            id: 6,
                            full_name: "Federico Bianchi"
                        }
                    },
                    {
                        id: 8,
                        last_interaction: "2025-11-08T21:05:18.000Z",
                        messages: [
                            {
                                id: 23,
                                content: "Genial!"
                            }
                        ],
                        contact: {
                            id: 3,
                            full_name: "Gabriela Prats"
                        }
                    }
                ],
                email: [
                    {
                        id: 5,
                        last_interaction: "2025-11-02T16:59:22.000Z",
                        messages: [
                            {
                                id: 14,
                                content: "Perfecto."
                            }
                        ],
                        contact: {
                            id: 2,
                            full_name: "Luciana Medina"
                        }
                    }
                ]
            }
        }
    },

};