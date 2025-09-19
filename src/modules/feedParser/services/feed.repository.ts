import {News} from "../types/news.types";
import {FastifyInstance} from "fastify";

export class FeedRepository {
    constructor(private fastify: FastifyInstance) {

    }

    async createMany(news: Omit<News, "id">[]): Promise<{ count: number }> {
        return this.fastify.prisma.news.createMany({ data: news });
    }

    async findBySource(source: string): Promise<News[]> {
        return this.fastify.prisma.news.findMany({
            where: { source },
            orderBy: { date: "desc" },
        });
    }

    async deleteBySource(source: string): Promise<{ count: number }> {
        return this.fastify.prisma.news.deleteMany({ where: { source } });
    }

}
