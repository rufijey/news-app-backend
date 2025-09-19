import {Config} from "../config/schema";
import prisma from '../prisma';

declare module 'fastify' {
    interface FastifyInstance {
        config: Config;
        pluginLoaded: (pluginName: string) => void;
        prisma: typeof prisma;
    }
};