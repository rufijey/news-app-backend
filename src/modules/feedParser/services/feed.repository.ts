import {PrismaClient} from "@prisma/client";
import prisma from "../../../prisma";
import {News} from "../types/news.types";

class FeedRepository {
    async createMany(news: Omit<News, "id">[]): Promise<{ count: number }> {
        return prisma.news.createMany({ data: news });
    }

    async findBySource(source: string): Promise<News[]> {
        return prisma.news.findMany({
            where: { source },
            orderBy: { date: "desc" },
        });
    }

    async deleteBySource(source: string): Promise<{ count: number }> {
        return prisma.news.deleteMany({ where: { source } });
    }

}
export const feedRepository = new FeedRepository();
