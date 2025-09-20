import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { schema } from "../schemas/getFeedData.schema";
import { FeedService } from "../services/feed.service";

export default async function feedRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
    const feedService = new FeedService(fastify);

    route.get("/feed", { schema }, async (request, reply) => {
        const url = request.query.url || fastify.config.DEFAULT_RSS_URL;
        const isForce = request.query.force === "1";

        const news = await feedService.getFeedData(url, isForce);

        return reply.send({
            count: news.length,
            news,
        });
    });
}
