import { join } from "node:path";
import AutoLoad from "@fastify/autoload";
import Fastify, { type FastifyServerOptions } from "fastify";
import configPlugin from "./config";
import getFeedDataRoutes from "./modules/feedParser/routes/feed.route";

export type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
    const fastify = Fastify();
    await fastify.register(configPlugin);
    try {
        fastify.decorate("pluginLoaded", (pluginName: string) => {
            fastify.log.info(`✅ Plugin loaded: ${pluginName}`);
        });

        fastify.log.info("Starting to load plugins");
        await fastify.register(AutoLoad, {
            dir: join(__dirname, "plugins"),
            options,
            ignorePattern: /^((?!plugin).)*$/,
        });
        fastify.log.info("✅ Plugins loaded successfully");

        fastify.log.info("Starting to load routes");
        await fastify.register(AutoLoad, {
            dir: join(__dirname, "modules"),
            options,
            dirNameRoutePrefix: false,
            ignorePattern: /.*(?<!route)\.(ts|js)$/,
        });
        fastify.log.info("✅ Routes loaded successfully");
    } catch (error) {
        fastify.log.error("Error in autoload:", error);
        throw error;
    }

    return fastify;
}

export default buildApp;
