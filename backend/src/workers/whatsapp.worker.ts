import { WhatsAppApiService } from "../services/whatsapp-api.service";
import { whatsAppQueue } from "../queues/whatsapp.queue";

whatsAppQueue.process(async (job, done) => {
    const { message } = job.data;
    const whatsAppService = new WhatsAppApiService;
    const response = await whatsAppService.sendMessage(message);
    if (response.success) {
        done();
    }

    return { status: "sent" };
});
