import Parser from "rss-parser";
import retry from "async-retry";
import {News} from "../types/news.types";
import {FeedRepository} from "./feed.repository";
import { ObjectId } from "bson";
import {FastifyInstance} from "fastify";


export class FeedService {
    private parser: Parser;
    private feedRepository: FeedRepository;

    constructor(private fastify: FastifyInstance) {
        this.parser = new Parser();
        this.feedRepository = new FeedRepository(fastify);

    }

    async getFeedData(url: string, isForce = false): Promise<News[]> {

        if (isForce) {

            const parsedNews = await this.parseFeed(url);

            this.feedRepository.deleteBySource(url)
                .then(() => this.feedRepository.createMany(parsedNews))
                .catch(err => console.error('Background DB operation error:', err));

            return parsedNews;
        }

        const news = await this.feedRepository.findBySource(url);

        if (news.length > 0) {
            return news;
        } else {
            const parsedNews = await this.parseFeed(url);

            this.feedRepository.createMany(parsedNews)
                .catch((err) => console.log('Background DB operation error', err));

            return parsedNews;
        }
    }

    async parseFeed(url: string): Promise<News[]> {
        const feed = await retry(
            async () => this.parser.parseURL(url),
            {
                retries: 3,
                factor: 2,
                minTimeout: 1000,
                onRetry: (err: Error, attempt) =>
                    console.warn(`Retry ${attempt} for ${url}: ${err.message}`),
            }
        );

        return (feed.items || []).map((item: any) =>
            this.normalizeItem(item, url)
        );
    }

    private normalizeItem(item: Parser.Item, url: string): News {
        const isoDate = item.isoDate;
        const date = isoDate ? new Date(isoDate).toISOString() : null;
        const contentSnippet = item.contentSnippet ?? "";

        return {
            id: new ObjectId().toHexString(),
            title: item.title ?? null,
            date,
            contentSnippet,
            source: url,
        };
    }
}
