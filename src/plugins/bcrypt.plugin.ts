import bcrypt from "bcrypt";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
    fastify.decorate("bcrypt", {
        hash: async (password: string) => bcrypt.hash(password, 10),
        compare: async (password: string, hash: string) => bcrypt.compare(password, hash),
    });
});
