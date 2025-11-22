export default {
    Paginate: {
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
    }
};
