import Parser from "rss-parser";
import retry from "async-retry";
import { randomUUID } from "node:crypto";
import {NewsItem} from "../types/News.types";

const parser = new Parser();

function normalizeItem(item: any, url: string): NewsItem {
    const isoDate = item.isoDate;
    const date = isoDate ? new Date(isoDate).toISOString() : null;
    const contentSnippet = item.contentSnippet ?? "";

    return {
        id: item.guid,
        title: item.title ?? null,
        date,
        contentSnippet,
        source: url
    };
}

export async function parseFeed(url: string, sourceName?: string): Promise<NewsItem[]> {
    const feed = await retry(
        async () => parser.parseURL(url),
        {
            retries: 3,
            factor: 2,
            minTimeout: 1000,
            onRetry: (err: Error, attempt) => console.warn(`Retry ${attempt} for ${url}: ${err.message}`),
        }
    );

    return (feed.items || []).map((item: any) => normalizeItem(item, url));
}

export async function getFeedData(url: string, isForce: boolean = false): Promise<NewsItem[]> {
    const news = await parseFeed(url);
    return news;
}
