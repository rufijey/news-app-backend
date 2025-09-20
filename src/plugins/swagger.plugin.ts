import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export default fp(
    async (fastify: FastifyInstance) => {
        await fastify.register(swagger, {
            openapi: {
                info: {
                    title: "News App API",
                    description: "API documentation for News App backend",
                    version: "1.0.0",
                },
                servers: [
                    {
                        url: fastify.config.API_URL,
                        description: "Local server",
                    },
                ],
            },
        });

        await fastify.register(swaggerUI, {
            routePrefix: "/docs",
            uiConfig: {
                docExpansion: "list",
                deepLinking: false,
            },
        });

        fastify.log.info("✅ Swagger UI available at /docs");
    },
    {
        name: "swagger-plugin",
    },
);
