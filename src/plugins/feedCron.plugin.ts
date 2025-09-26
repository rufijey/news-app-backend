import type { FastifyPluginAsync } from "fastify";
import cron from "node-cron";
import { getFeedData } from "../modules/feedParser/services/feed.service";
import type { News } from "../modules/feedParser/types/news.types";

const feedCronPlugin: FastifyPluginAsync = async (fastify) => {
    const feedUrl = fastify.config.DEFAULT_RSS_URL;

    const cronExpression = "0 * * * *";

    cron.schedule(cronExpression, async () => {
        fastify.log.info(`Starting background feed update: ${feedUrl}`);

        try {
            const news: News[] = await getFeedData(fastify, feedUrl, true);
            fastify.log.info(`Feed updated successfully, fetched ${news.length} news items`);
        } catch (err) {
            fastify.log.error(err, `Error while updating feed: ${feedUrl}`);
        }
    });
};

export default feedCronPlugin;
