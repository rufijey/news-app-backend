import retry from "async-retry";
import { ObjectId } from "bson";
import type { FastifyInstance } from "fastify";
import Parser from "rss-parser";
import type { News } from "../types/news.types";
import * as feedRepo from "./feed.repository";

const parser = new Parser();

function normalizeItem(item: Parser.Item, url: string): News {
    const date = item.isoDate ? new Date(item.isoDate).toISOString() : null;

    return {
        id: new ObjectId().toHexString(),
        title: item.title ?? "",
        date,
        contentSnippet: item.contentSnippet ?? "",
        source: url,
        link: item.link ?? "",
    };
}

async function parseFeed(fastify: FastifyInstance, url: string): Promise<News[]> {
    const feed = await retry(async () => parser.parseURL(url), {
        retries: 3,
        factor: 2,
        minTimeout: 1000,
        onRetry: (err: Error, attempt) =>
            fastify.log.warn(`Retry ${attempt} for ${url}: ${err.message}`),
    });

    return (feed.items || []).map((item) => normalizeItem(item, url));
}

export async function getFeedData(fastify: FastifyInstance, url: string, isForce = false) {
    if (isForce) {
        const parsedNews = await parseFeed(fastify, url);

        feedRepo
            .deleteBySource(fastify, url)
            .then(() => feedRepo.createMany(fastify, parsedNews))
            .catch((err) => fastify.log.error("Background DB operation error:", err));

        return parsedNews;
    }

    const news = await feedRepo.findBySource(fastify, url);
    if (news.length > 0) return news;

    const parsedNews = await parseFeed(fastify, url);

    feedRepo
        .createMany(fastify, parsedNews)
        .catch((err) => fastify.log.error("Background DB operation error:", err));

    return parsedNews;
}
