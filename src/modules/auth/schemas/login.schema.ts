export const loginSchema = {
    tags: ["Auth"],
    body: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
        },
        additionalProperties: false,
    },
    response: {
        200: {
            type: "object",
            properties: {
                accessToken: { type: "string" },
            },
            additionalProperties: false,
        },
        401: {
            type: "object",
            properties: {
                error: { type: "string" },
            },
        },
    },
} as const;
