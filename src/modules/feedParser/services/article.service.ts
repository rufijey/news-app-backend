import axios from "axios";
import * as cheerio from "cheerio/dist/browser";
import type { FastifyInstance } from "fastify";
import type { Article } from "../types/news.types";

export async function getArticleData(fastify: FastifyInstance, url: string): Promise<Article> {
    try {
        const { data: html } = await axios.get(url);

        const $ = cheerio.load(html);

        const title =
            $("meta[property='og:title']").attr("content") || $("h1").first().text().trim();

        const image =
            $("meta[property='og:image']").attr("content") ||
            $("meta[name='twitter:image']").attr("content") ||
            $("img").first().attr("src");

        const paragraphs: string[] = [];
        $("article p, div p").each((_, el) => {
            const t = $(el).text().trim();
            if (t) paragraphs.push(t);
        });

        return { title, image, text: paragraphs.join("\n\n") };
    } catch (err) {
        fastify.log.error(err);
        throw err;
    }
}
