export const getArticleDataSchema = {
    querystring: {
        type: "object",
        required: ["url"],
        properties: {
            url: { type: "string", format: "uri" },
        },
    },
    response: {
        200: {
            type: "object",
            properties: {
                title: { type: "string" },
                image: { type: "string", nullable: true },
                text: { type: "string" },
            },
            additionalProperties: false,
        },
        400: {
            type: "object",
            properties: {
                error: { type: "string" },
            },
        },
        500: {
            type: "object",
            properties: {
                error: { type: "string" },
            },
        },
    },
} as const;
