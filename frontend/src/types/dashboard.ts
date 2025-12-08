export interface KpiMetric {
    label: string;
    value: string | number;
    trend?: {
        value: number;
        type: "increase" | "decrease";
    };
    icon?: React.ReactNode;
    subtitle?: string;
}

export interface SalesDataPoint {
    month: string;
    value: number;
}

export interface Task {
    id: string;
    title: string;
    client: string;
    dueDate: string;
    priority: "high" | "medium" | "low";
    type?: string;
}

export interface RecentConversation {
    id: string;
    contactName: string;
    message: string;
    timestamp: string;
    avatar?: string;
    channel?: "whatsapp" | "mail";
}

export interface DashboardMetrics {
    activeLeads: number;
    conversations: number;
    conversationsToday?: number;
    conversionRate: number;
    totalContacts: number;
    activeLeadsTrend?: number;
    conversationsTrend?: number;
    conversionRateTrend?: number;
    totalContactsTrend?: number;
    pipelineValue?: number;
    monthSales?: number;
    dealsConversionRate?: number;
    avgDealValue?: number;
}
