import {Config} from "../config/schema";
import { PrismaClient } from '@prisma/client';

declare module 'fastify' {
    interface FastifyInstance {
        config: Config;
        pluginLoaded: (pluginName: string) => void;
        prisma: PrismaClient;
    }
};