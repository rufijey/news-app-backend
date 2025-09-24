import cors from "@fastify/cors";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(
    async (fastify: FastifyInstance) => {
        await fastify.register(cors, {
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
            credentials: true,
        });

        fastify.log.info("✅ CORS enabled");
    },
    { name: "cors-plugin" },
);
