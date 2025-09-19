import fp from 'fastify-plugin';
import prisma from '../prisma';


export default fp(async (fastify) => {
    fastify.addHook('onReady', async () => {
        try {
            await prisma.$connect();
            fastify.log.info('Prisma connected');
        } catch (err) {
            fastify.log.error({ err }, 'Prisma connect failed');
        }
    });


    fastify.addHook('onClose', async () => {
        try {
            await prisma.$disconnect();
            fastify.log.info('Prisma disconnected');
        } catch (err) {
            fastify.log.error({ err }, 'Error during prisma disconnect');
        }
    });
});