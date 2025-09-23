import type { FastifyInstance } from "fastify";
import { createUser, findUserByEmail } from "./user.repository";

export async function registerUser(
    fastify: FastifyInstance,
    email: string,
    username: string,
    password: string,
) {
    const existing = await findUserByEmail(fastify, email);
    if (existing) throw fastify.httpErrors.conflict("Email already registered");

    const hashed = await fastify.bcrypt.hash(password);
    const user = await createUser(fastify, { email, username, password: hashed });

    const token = fastify.jwt.sign({ id: user.id, email: user.email });
    return { accessToken: token };
}

export async function loginUser(fastify: FastifyInstance, email: string, password: string) {
    const user = await findUserByEmail(fastify, email);
    if (!user) throw fastify.httpErrors.unauthorized("Invalid email or password");

    const ok = await fastify.bcrypt.compare(password, user.password);
    if (!ok) throw fastify.httpErrors.unauthorized("Invalid email or password");

    const token = fastify.jwt.sign({ id: user.id, email: user.email });
    return { accessToken: token };
}
