export const getArticleDataSchema = {
    tags: ["News"],
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
    },
} as const;
