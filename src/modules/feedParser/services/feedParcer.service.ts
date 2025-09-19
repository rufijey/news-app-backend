import Parser from "rss-parser";
import retry from "async-retry";
import {News} from "../types/news.types";
import {feedRepository} from "./feed.repository";
import {randomUUID} from "node:crypto";


class FeedService {
    private parser: Parser;

    constructor() {
        this.parser = new Parser();
    }

    async getFeedData(url: string, isForce = false): Promise<News[]> {

        if (isForce) {

            const parsedNews = await this.parseFeed(url);

            feedRepository.deleteBySource(url)
                .then(() => feedRepository.createMany(parsedNews))
                .catch(err => console.error('Background DB operation error:', err));

            return parsedNews;
        }

        const news = await feedRepository.findBySource(url);

        if (news.length > 0) {
            return news;
        } else {
            const parsedNews = await this.parseFeed(url);

            feedRepository.createMany(parsedNews)
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
            id: randomUUID(),
            title: item.title ?? null,
            date,
            contentSnippet,
            source: url,
        };
    }
}

export const feedService = new FeedService();
