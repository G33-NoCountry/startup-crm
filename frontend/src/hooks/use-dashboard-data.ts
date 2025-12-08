"use client";

import { useState, useEffect } from "react";
import type {
    DashboardMetrics,
    SalesDataPoint,
    Task,
    RecentConversation,
} from "@/types/dashboard";

// Hook para simular el fetching de datos del dashboard
// TODO: Reemplazar con React Query cuando los endpoints estén disponibles
export function useDashboardData() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const [data, setData] = useState<{
        metrics: DashboardMetrics;
        salesData: SalesDataPoint[];
        tasks: Task[];
        conversations: RecentConversation[];
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));

                setData({
                    metrics: {
                        activeLeads: 342,
                        conversations: 856,
                        conversationsToday: 17,
                        conversionRate: 24.8,
                        totalContacts: 1284,
                        activeLeadsTrend: 8,
                        conversationsTrend: 17,
                        conversionRateTrend: -12,
                        totalContactsTrend: 12,
                        pipelineValue: 182000,
                        monthSales: 50000,
                        dealsConversionRate: 25,
                        avgDealValue: 4500,
                    },
                    salesData: [
                        { month: "Ene", value: 45000 },
                        { month: "Feb", value: 38000 },
                        { month: "Mar", value: 32000 },
                        { month: "Abr", value: 42000 },
                        { month: "May", value: 68000 },
                        { month: "Jun", value: 52000 },
                        { month: "Jul", value: 48000 },
                        { month: "Ago", value: 41000 },
                        { month: "Sep", value: 38000 },
                        { month: "Oct", value: 51000 },
                        { month: "Nov", value: 58000 },
                        { month: "Dic", value: 48000 },
                    ],
                    tasks: [
                        {
                            id: "1",
                            title: "Llamada seguimiento de propuesta",
                            client: "Laura Torres",
                            dueDate: "Hoy 14:00",
                            priority: "high",
                            type: "call",
                        },
                        {
                            id: "2",
                            title: "Enviar cotización",
                            client: "Roberto Díaz",
                            dueDate: "Mañana 10:00",
                            priority: "medium",
                            type: "email",
                        },
                        {
                            id: "3",
                            title: "Reunión de cierre",
                            client: "Tech Solutions S.A.",
                            dueDate: "Viernes 16:00",
                            priority: "low",
                            type: "meeting",
                        },
                    ],
                    conversations: [
                        {
                            id: "1",
                            contactName: "Carolina Díaz",
                            message:
                                "Me gustaría saber qué precios tienen para los produc...",
                            timestamp: "5 min",
                            channel: "whatsapp",
                        },
                        {
                            id: "2",
                            contactName: "Juan Cebrio",
                            message: "Perfecto, muchas gracias",
                            timestamp: "5 min",
                            channel: "mail",
                        },
                        {
                            id: "3",
                            contactName: "Melanie Ceballos",
                            message:
                                "Necesito un poco más de servicios para mi compañía",
                            timestamp: "5 min",
                            channel: "whatsapp",
                        },
                        {
                            id: "4",
                            contactName: "Irene Lis",
                            message:
                                "Me gustaría saber qué pueden ofrecer para los produ...",
                            timestamp: "9 min",
                            channel: "mail",
                        },
                    ],
                });

                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Error al cargar los datos"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, isLoading, error };
}

// TODO: Implementar estos hooks cuando los endpoints estén disponibles
// import { useQuery } from "@tanstack/react-query";
//
// export function useDashboardMetrics() {
//   return useQuery({
//     queryKey: ["dashboard", "metrics"],
//     queryFn: async () => {
//       const response = await fetch("/api/metrics/kpi-summary");
//       if (!response.ok) throw new Error("Error al cargar métricas");
//       return response.json();
//     },
//   });
// }
//
// export function useSalesChart() {
//   return useQuery({
//     queryKey: ["dashboard", "sales-chart"],
//     queryFn: async () => {
//       const response = await fetch("/api/metrics/sales-chart");
//       if (!response.ok) throw new Error("Error al cargar gráfico de ventas");
//       return response.json();
//     },
//   });
// }
