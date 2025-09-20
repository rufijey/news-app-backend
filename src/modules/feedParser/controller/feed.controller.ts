import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { FromSchema } from "json-schema-to-ts";
import type { schema } from "../schemas/getFeedData.schema";
import { FeedService } from "../services/feed.service";

export class FeedController {
    private feedService: FeedService;

    constructor(private fastify: FastifyInstance) {
        this.feedService = new FeedService(fastify);
    }

    async getFeedData(
        request: FastifyRequest<{
            Querystring: FromSchema<typeof schema.querystring>;
        }>,
        reply: FastifyReply,
    ) {
        const url = request.query.url || this.fastify.config.DEFAULT_RSS_URL;
        const isForce = request.query.force === "1";

        const news = await this.feedService.getFeedData(url, isForce);

        return reply.send({
            count: news.length,
            news,
        });
    }
}
