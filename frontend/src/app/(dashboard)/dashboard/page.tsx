"use client";

import { KpiCard } from "@/components/features/dashboard/kpi-card";
import { SalesChart } from "@/components/features/dashboard/sales-chart";
import { UpcomingTasks } from "@/components/features/dashboard/upcoming-tasks";
import { RecentConversations } from "@/components/features/dashboard/recent-conversations";
import { DashboardSkeleton } from "@/components/features/dashboard/dashboard-skeleton";
import { DashboardError } from "@/components/features/dashboard/dashboard-error";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { Flame, MessageCircle, TrendingUp, Users } from "lucide-react";

export default function DashboardPage() {
    const { data, isLoading, error } = useDashboardData();

    if (isLoading) {
        return (
            <div className="container mx-auto p-6">
                <DashboardSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <DashboardError error={error} />
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const { metrics, salesData, tasks, conversations } = data;

    return (
        <div className="container mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">
                        Resumen de tus actividades y métricas clave
                    </p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    label="Leads Activos"
                    value={metrics.activeLeads.toLocaleString()}
                    trend={
                        metrics.activeLeadsTrend
                            ? {
                                  value: metrics.activeLeadsTrend,
                                  type: metrics.activeLeadsTrend >= 0 ? "increase" : "decrease",
                              }
                            : undefined
                    }
                    icon={<Flame className="h-5 w-5" />}
                />

                <KpiCard
                    label="Conversaciones"
                    value={metrics.conversations.toLocaleString()}
                    trend={
                        metrics.conversationsTrend
                            ? {
                                  value: metrics.conversationsTrend,
                                  type: metrics.conversationsTrend >= 0 ? "increase" : "decrease",
                              }
                            : undefined
                    }
                    icon={<MessageCircle className="h-5 w-5" />}
                    subtitle={
                        metrics.conversationsToday
                            ? `${metrics.conversationsToday} hoy`
                            : undefined
                    }
                />

                <KpiCard
                    label="Tasa Conversión"
                    value={`${metrics.conversionRate}%`}
                    trend={
                        metrics.conversionRateTrend
                            ? {
                                  value: Math.abs(metrics.conversionRateTrend),
                                  type: metrics.conversionRateTrend >= 0 ? "increase" : "decrease",
                              }
                            : undefined
                    }
                    icon={<TrendingUp className="h-5 w-5" />}
                />

                <KpiCard
                    label="Total Contactos"
                    value={metrics.totalContacts.toLocaleString()}
                    trend={
                        metrics.totalContactsTrend
                            ? {
                                  value: metrics.totalContactsTrend,
                                  type: metrics.totalContactsTrend >= 0 ? "increase" : "decrease",
                              }
                            : undefined
                    }
                    icon={<Users className="h-5 w-5" />}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <SalesChart data={salesData} title="Métricas de ventas" />
                <UpcomingTasks
                    tasks={tasks}
                    onManage={() => {
                        // TODO: Navegar a la página de tareas
                        console.log("Gestionar tareas");
                    }}
                />
            </div>

            <RecentConversations
                conversations={conversations}
                onSeeMore={() => {
                    // TODO: Navegar a la página de conversaciones
                    console.log("Ver más conversaciones");
                }}
            />
        </div>
    );
}