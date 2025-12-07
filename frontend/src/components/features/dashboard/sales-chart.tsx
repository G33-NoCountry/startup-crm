"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SalesDataPoint } from "@/types/dashboard";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { useState } from "react";

interface SalesChartProps {
    data: SalesDataPoint[];
    title?: string;
}

export function SalesChart({ data, title = "Métricas de ventas" }: SalesChartProps) {
    const [timeFilter, setTimeFilter] = useState<"day" | "month" | "year">("month");

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    <Tabs
                        value={timeFilter}
                        onValueChange={(value) => setTimeFilter(value as "day" | "month" | "year")}
                    >
                        <TabsList className="h-8">
                            <TabsTrigger value="day" className="text-xs">
                                Día
                            </TabsTrigger>
                            <TabsTrigger value="month" className="text-xs">
                                Mes
                            </TabsTrigger>
                            <TabsTrigger value="year" className="text-xs">
                                Año
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="month"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--popover))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)",
                            }}
                            labelStyle={{ color: "hsl(var(--popover-foreground))" }}
                            formatter={(value: number) => [`$${value.toLocaleString()}`, "Ventas"]}
                        />
                        <Bar
                            dataKey="value"
                            fill="hsl(var(--primary))"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
