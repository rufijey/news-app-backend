import type { FastifyInstance } from "fastify";
import { healthSchemas } from "../schemas/health.schema";

export default async function healthRoute(fastify: FastifyInstance) {
    fastify.get("/health", { schema: healthSchemas.server }, async () => {
        return {
            status: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        };
    });

    fastify.get("/health/db", { schema: healthSchemas.db }, async () => {
        try {
            await fastify.prisma.$runCommandRaw({ ping: 1 });

            return { status: "ok", db: "connected" };
        } catch (err) {
            fastify.log.error(err);
            return { status: "error", db: "disconnected" };
        }
    });
}
