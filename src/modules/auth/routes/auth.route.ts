import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";
import { loginUser, registerUser } from "../services/auth.service";

export default async function authRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

    route.post("/register", { schema: registerSchema }, async (request, reply) => {
        const { email, username, password } = request.body;
        return reply.send(await registerUser(fastify, { email, username, password }));
    });

    route.post("/login", { schema: loginSchema }, async (request, reply) => {
        const { email, password } = request.body;
        return reply.send(await loginUser(fastify, email, password));
    });
}
