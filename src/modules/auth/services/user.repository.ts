import type { FastifyInstance } from "fastify";

export async function createUser(
    fastify: FastifyInstance,
    data: { email: string; username: string; password: string },
) {
    return fastify.prisma.user.create({ data });
}

export async function findUserByEmail(fastify: FastifyInstance, email: string) {
    return fastify.prisma.user.findUnique({ where: { email } });
}
