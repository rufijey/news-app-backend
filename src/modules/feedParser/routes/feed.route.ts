import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { getArticleDataSchema } from "../schemas/getArticleData";
import { getFeedDataSchema } from "../schemas/getFeedData.schema";
import { getArticleData } from "../services/article.service";
import { getFeedData } from "../services/feed.service";

export default async function feedRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

    route.get("/feed", { schema: getFeedDataSchema }, async (request, reply) => {
        const url = request.query.url || fastify.config.DEFAULT_RSS_URL;
        const isForce = request.query.force === "1";

        const news = await getFeedData(fastify, url, isForce);

        return reply.send({ count: news.length, news });
    });

    route.get("/article", { schema: getArticleDataSchema }, async (request, reply) => {
        const url = request.query.url;
        if (!url) return reply.badRequest("url is required");

        return reply.send(await getArticleData(fastify, url));
    });
}
