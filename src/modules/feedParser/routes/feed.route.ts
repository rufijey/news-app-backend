import type { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import type { FastifyInstance } from "fastify";
import { FeedController } from "../controller/feed.controller";
import { schema } from "../schemas/getFeedData.schema";

export default async function feedRoutes(fastify: FastifyInstance) {
    const route = fastify.withTypeProvider<JsonSchemaToTsProvider>();
    const controller = new FeedController(fastify);

    route.get("/feed", { schema }, controller.getFeedData.bind(controller));
}
