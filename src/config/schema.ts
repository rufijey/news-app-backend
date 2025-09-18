import {FromSchema} from "json-schema-to-ts";
export const EnvSchema = {
    type: 'object',
    properties: {
        PORT: {type: 'number'},
        HOST: {type: 'string'},
        DEFAULT_RSS_URL: {type: 'string'},
    },
    required: ['PORT', 'HOST', 'DEFAULT_RSS_URL'],
    additionalProperties: false,
} as const;
export type Config = FromSchema<typeof EnvSchema>;