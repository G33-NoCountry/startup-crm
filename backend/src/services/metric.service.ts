import { GetMetricsDto } from "../dto/metrics/get-metrics.dto";
import { IMetricRepository } from "../interfaces/metric.interface";
import { Task } from "../models";

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

  public async getFunnelProgress(): Promise<any> {
    const newFunnel = await this.getFunnelById(1);
    const contacted = await this.getFunnelById(2);
    const interested = await this.getFunnelById(3);
    const submitted_proposal = await this.getFunnelById(4);
    const closed_won = await this.getFunnelById(5);
    const closed_lost = await this.getFunnelById(6);

    return {
      new: newFunnel,
      contacted,
      interested,
      submitted_proposal,
      closed_won,
      closed_lost
    };
  }

  private async getFunnelById(funnelId: number): Promise<number> {
    return this.metricRepository.getCountFunnelById(funnelId);
  }

  public async getPendingTasks(userId: number): Promise<Task[]> {
    return this.metricRepository.getTasksByStatus(false, userId);
  }

  public async getRecentActivity(userId: number): Promise<any> {
    return this.metricRepository.generateRecentActivity(userId);
  }
}
