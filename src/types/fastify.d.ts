import type { PrismaClient } from "@prisma/client";
import type { Config } from "../config/schema";

declare module "fastify" {
    interface FastifyInstance {
        config: Config;
        pluginLoaded: (pluginName: string) => void;
        prisma: PrismaClient;
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
        bcrypt: {
            hash(password: string): Promise<string>;
            compare(password: string, hash: string): Promise<boolean>;
        };
    }

    interface FastifyRequest {
        user: { id: string; email: string };
    }
}
