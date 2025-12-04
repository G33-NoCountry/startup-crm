export default {
    DealKanbanItem: {
        type: "object",
        properties: {
            id: {
                type: "integer",
                example: 101,
                description: "ID único del deal"
            },
            title: {
                type: "string",
                example: "Venta Licencia Enterprise",
                description: "Nombre de la oportunidad"
            },
            value: {
                type: "number",
                format: "float",
                example: 1500.00,
                description: "Valor monetario estimado"
            },
            created_at: {
                type: "string",
                format: "date-time",
                example: "2024-11-25T14:30:00Z"
            },
            contact: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 5 },
                    full_name: { type: "string", example: "Sofía Rodríguez" },
                    email: { type: "string", example: "sofia@mail.com" }
                }
            },
            funnel_stage: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 2 },
                    title: { type: "string", example: "Contactado" },
                    sort_order: { type: "integer", example: 2 },
                    is_closed: { type: "boolean", example: false }
                }
            },
            user: {
                type: "object",
                properties: {
                    id: { type: "integer", example: 1 },
                    full_name: { type: "string", example: "Juan Perez" },
                    avatar_color: { type: "string", example: "ff0033" }
                }
            }
        }
    },

    DealsListResponse: {
        type: "object",
        properties: {
            success: {
                type: "boolean",
                example: true
            },
            message: {
                type: "string",
                example: "Pipeline de ventas obtenido correctamente."
            },
            data: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/DealKanbanItem" 
                }
            }
        }
    },

    DealCreateRequest: {
        type: "object",
        required: ["title", "contact_id"],
        properties: {
            title: {
                type: "string",
                example: "Implementación de App Móvil",
                description: "Título de la oportunidad de negocio."
            },
            contact_id: {
                type: "integer",
                example: 5,
                description: "ID del contacto existente al que se asocia este deal."
            },
            value: {
                type: "number",
                format: "float",
                example: 25000.00,
                description: "Valor monetario estimado del deal (opcional)."
            }
        }
    },
    DealCreateResponse: {
        type: "object",
        properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Deal creado exitosamente y asociado a la primera etapa." },
            data: {
                $ref: "#/components/schemas/DealKanbanItem"
            }
        }
    }
};