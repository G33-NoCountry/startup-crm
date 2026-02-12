import Queue from "bull";
import { redisConfig } from "../config/redis.config";

export const emailQueue = new Queue("EmailQueue", {
    redis: redisConfig
});

emailQueue.on("completed", (job) => {
    console.log(`Job ${job.id} completado`);
});

emailQueue.on("failed", (job, err) => {
    console.error(`Job ${job.id} falló:`, err);
});
