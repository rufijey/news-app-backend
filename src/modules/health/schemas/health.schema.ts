export const healthSchemas = {
    server: {
        tags: ["Health"],
        response: {
            200: {
                type: "object",
                properties: {
                    status: { type: "string", example: "ok" },
                    uptime: { type: "number", example: 123.45 },
                    timestamp: { type: "string", format: "date-time", example: "2025-09-21T12:34:56Z" }
                }
            }
        }
    },

    db: {
        tags: ["Health"],
        response: {
            200: {
                type: "object",
                properties: {
                    status: { type: "string", example: "ok" },
                    db: { type: "string", example: "connected" }
                }
            }
        }
    }
};
