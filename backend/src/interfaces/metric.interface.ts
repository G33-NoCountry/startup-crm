export interface IMetricRepository {
    getCountActiveContacts(): Promise<number>;
    getCountSentMessagesByUser(user_id: number): Promise<number>;
    getTotalSentMessages(): Promise<number>;
    calculateResponseRate(): Promise<any>;
    calculateDealValues(): Promise<any>;
}