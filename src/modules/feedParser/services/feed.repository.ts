import type { FastifyInstance } from "fastify";
import type { News } from "../types/news.types";

export async function createMany(fastify: FastifyInstance, news: Omit<News, "id">[]) {
    return fastify.prisma.news.createMany({ data: news });
}

export async function findBySource(fastify: FastifyInstance, source: string) {
    return fastify.prisma.news.findMany({
        where: { source },
        orderBy: { date: "desc" },
    });
}

export async function deleteBySource(fastify: FastifyInstance, source: string) {
    return fastify.prisma.news.deleteMany({ where: { source } });
}
