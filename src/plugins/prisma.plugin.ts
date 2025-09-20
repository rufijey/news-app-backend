import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import prisma from "../prisma";

async function prismaPlugin(fastify: FastifyInstance) {
    fastify.decorate("prisma", prisma);

    fastify.addHook("onReady", async () => {
        try {
            await prisma.$connect();
            fastify.log.info("Prisma connected");
        } catch (err) {
            fastify.log.error({ err }, "Prisma connection failed");
        }
    });

    fastify.addHook("onClose", async (instance) => {
        try {
            await prisma.$disconnect();
            fastify.log.info("Prisma disconnected");
        } catch (err) {
            fastify.log.error({ err }, "Error during Prisma disconnect");
            throw err;
        }
    });
}

export default fp(prismaPlugin, {
    name: "prisma-plugin",
});
