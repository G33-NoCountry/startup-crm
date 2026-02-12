import { emailQueue } from "../queues/email.queue";
import { MailService } from "../services/mail.service";

emailQueue.process(async (job, done) => {
    const { to, subject, html } = job.data;
    const mailService = new MailService;
    const response = await mailService.sendMail({ to, subject, html });
    if (response.success) {
        done();
    }

    return { status: "sent" };
});
