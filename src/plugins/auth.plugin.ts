import jwt from "@fastify/jwt";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
    fastify.register(jwt, {
        secret: fastify.config.JWT_SECRET,
    });

    fastify.decorate("authenticate", async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            return reply.unauthorized("Invalid or missing token");
        }
    });
});
