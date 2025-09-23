export const registerSchema = {
    tags: ["Auth"],
    body: {
        type: "object",
        required: ["email", "username", "password"],
        properties: {
            email: { type: "string", format: "email" },
            username: { type: "string", minLength: 3, maxLength: 30 },
            password: { type: "string", minLength: 6 },
        },
        additionalProperties: false,
    },
    response: {
        201: {
            type: "object",
            properties: {
                accessToken: { type: "string" },
            },
            additionalProperties: false,
        },
        400: {
            type: "object",
            properties: {
                error: { type: "string" },
            },
        },
    },
} as const;
