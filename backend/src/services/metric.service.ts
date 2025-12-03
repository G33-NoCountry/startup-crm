import { GetMetricsDto } from "../dto/metrics/get-metrics.dto";
import { IMetricRepository } from "../interfaces/metric.interface";

export class MetricService {

  constructor(private metricRepository: IMetricRepository) { }

  public async getMetrics(data: GetMetricsDto): Promise<any> {
    const activeContacts = await this.getActiveContacts();
    const messagesSentUser = await this.getSentMessagesByUser(data.user_id);
    const totalSentMessages = await this.getTotalSentMessages();
    const responseRate = await this.getResponseRate();
    const pipelines = await this.getPipelines();

    return {
      total_active_contacts: activeContacts,
      sent_messages: {
        overall: totalSentMessages,
        by_user: messagesSentUser,
      },
      response_rate: Number(responseRate.toFixed(2)),
      pipeline_value: pipelines,
    };
  }

  private async getActiveContacts(): Promise<number> {
    return this.metricRepository.getCountActiveContacts();
  }

  private async getSentMessagesByUser(user_id: number): Promise<number> {
    return this.metricRepository.getCountSentMessagesByUser(user_id);
  }

  private async getTotalSentMessages(): Promise<number> {
    return this.metricRepository.getTotalSentMessages();
  }

  private async getResponseRate() {
    return this.metricRepository.calculateResponseRate();
  }

  private async getPipelines() {
    return this.metricRepository.calculateDealValues();
  }

}
