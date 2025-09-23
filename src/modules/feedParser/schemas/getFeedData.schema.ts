export const getFeedDataSchema = {
    querystring: {
        type: "object",
        properties: {
            url: { type: "string", format: "uri", nullable: true },
            force: { type: "string", enum: ["0", "1"] },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: "object",
            properties: {
                count: { type: "integer" },
                news: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            title: { type: ["string", "null"] },
                            date: { type: ["string", "null"] },
                            contentSnippet: { type: "string" },
                            source: { type: "string" },
                            link: { type: "string" },
                        },
                        required: ["id", "title", "date", "contentSnippet", "source", "link"],
                        additionalProperties: false,
                    },
                },
            },
            required: ["count", "news"],
        },
    },
} as const;
