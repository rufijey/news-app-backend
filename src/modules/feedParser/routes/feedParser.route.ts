import {FastifyInstance} from "fastify";
import {JsonSchemaToTsProvider} from "@fastify/type-provider-json-schema-to-ts";
import {schema} from "../schemas/getFeedData.schema";
import {getFeedData, parseFeed} from "../services/feedParcer.service";

export async function getFeedDataRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();

    route.get(
        "/feed",
        {
            schema,
        },
        async (request, reply) => {
            const url = request.query.url || fastify.config.DEFAULT_RSS_URL;
            const isForce = request.query.force === "1";

            const news = await getFeedData(url, isForce);

            return reply.send({
                count: news.length,
                news,
            });
        }
    );
}
