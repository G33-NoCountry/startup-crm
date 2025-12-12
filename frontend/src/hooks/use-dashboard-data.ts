"use client";

import { useState, useEffect } from "react";
import type {
    DashboardMetrics,
    SalesDataPoint,
    Task,
    RecentConversation,
} from "@/types/dashboard";
import { dashboardService } from "@/lib/api/dashboardService";
import { mockConversations } from "@/lib/mocks/conversationsMock";

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

                const [metricsData, tasksData, funnelData] = await Promise.all([
                    dashboardService.getMetrics(),
                    dashboardService.getPendingTasks(),
                    dashboardService.getFunnelProgress(),
                ]);

                const safeMetrics: DashboardMetrics = {
                    activeLeads: metricsData?.activeLeads ?? 0,
                    conversations: metricsData?.conversations ?? 0,
                    conversationsToday: metricsData?.conversationsToday,
                    conversionRate: metricsData?.conversionRate ?? 0,
                    totalContacts: metricsData?.totalContacts ?? 0,
                    activeLeadsTrend: metricsData?.activeLeadsTrend,
                    conversationsTrend: metricsData?.conversationsTrend,
                    conversionRateTrend: metricsData?.conversionRateTrend,
                    totalContactsTrend: metricsData?.totalContactsTrend,
                    pipelineValue: metricsData?.pipelineValue,
                    monthSales: metricsData?.monthSales,
                    dealsConversionRate: metricsData?.dealsConversionRate,
                    avgDealValue: metricsData?.avgDealValue,
                };

                const tasksArray = Array.isArray(tasksData) ? tasksData : [];
                
                // Datos mock de respaldo para tareas si no hay datos del backend
                const mockTasks: Task[] = [
                    {
                        id: "1",
                        title: "Seguimiento con cliente potencial",
                        client: "María González",
                        dueDate: "15 dic, 14:00",
                        priority: "high",
                        type: "call",
                    },
                    {
                        id: "2",
                        title: "Enviar propuesta comercial",
                        client: "Carlos Ramírez",
                        dueDate: "16 dic, 10:30",
                        priority: "medium",
                        type: "call",
                    },
                    {
                        id: "3",
                        title: "Reunión de cierre",
                        client: "Ana Martínez",
                        dueDate: "18 dic, 16:00",
                        priority: "high",
                        type: "call",
                    },
                ];
                
                const mappedTasks: Task[] = tasksArray.length > 0
                    ? tasksArray.slice(0, 3).map((task) => ({
                        id: String(task.id),
                        title: task.title,
                        client: task.contact?.full_name || "Sin contacto",
                        dueDate: new Date(task.due_date).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        priority: task.priority as "high" | "medium" | "low",
                        type: "call",
                      }))
                    : mockTasks;

                const funnelArray = Array.isArray(funnelData) ? funnelData : [];
                
                // Datos mock de respaldo para el gráfico si no hay datos del backend
                const mockSalesData: SalesDataPoint[] = [
                    { month: "Prospecto", value: 45 },
                    { month: "Calificación", value: 32 },
                    { month: "Propuesta", value: 18 },
                    { month: "Negociación", value: 12 },
                    { month: "Cerrado", value: 8 },
                ];
                
                const salesData: SalesDataPoint[] = funnelArray.length > 0 
                    ? funnelArray.map((stage) => ({
                        month: stage.stage,
                        value: stage.value,
                      }))
                    : mockSalesData;

                const recentConversations: RecentConversation[] = mockConversations
                    .slice(0, 4)
                    .map((conv) => ({
                        id: String(conv.id),
                        contactName: conv.contact?.full_name || "Sin nombre",
                        message: "Última interacción",
                        timestamp: new Date(conv.last_interaction).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        channel: conv.channel as "whatsapp" | "mail",
                    }));

                setData({
                    metrics: safeMetrics,
                    salesData,
                    tasks: mappedTasks,
                    conversations: recentConversations,
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
