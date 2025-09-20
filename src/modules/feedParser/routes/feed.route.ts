import {FastifyInstance} from "fastify";
import {JsonSchemaToTsProvider} from "@fastify/type-provider-json-schema-to-ts";
import {schema} from "../schemas/getFeedData.schema";
import {FeedController} from "../controller/feed.controller";

export default async function feedRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
    const controller = new FeedController(fastify);

    route.get(
        "/feed",
        {schema},
        controller.getFeedData.bind(controller)
    );
}
