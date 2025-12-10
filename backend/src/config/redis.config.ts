import "dotenv/config";
import { env } from "process";

export const redisConfig = {
    host: "localhost",
    port: env.REDIS_PORT ? parseInt(env.REDIS_PORT) : 6379,
    options: {
        removeOnComplete: true,
        removeOnFail: true,
    }
};