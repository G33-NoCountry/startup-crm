import Queue from "bull";
import { redisConfig } from "../config/redis.config";

export const whatsAppQueue = new Queue("WhatsAppQueue", {
    redis: redisConfig
});

whatsAppQueue.on("completed", (job) => {
    console.log(`Job ${job.id} completado`);
});

whatsAppQueue.on("failed", (job, err) => {
    console.error(`Job ${job.id} falló:`, err);
});
