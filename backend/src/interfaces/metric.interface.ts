import { Task } from "../models";

export interface IMetricRepository {
    getCountActiveContacts(): Promise<number>;
    getCountSentMessagesByUser(user_id: number): Promise<number>;
    getTotalSentMessages(): Promise<number>;
    calculateResponseRate(): Promise<any>;
    calculateDealValues(): Promise<any>;
    getCountFunnelById(funnelId: number): Promise<number>;
    getTasksByStatus(status: boolean, userId: number): Promise<Task[]>;
    generateRecentActivity(userId: number): Promise<any>;
}