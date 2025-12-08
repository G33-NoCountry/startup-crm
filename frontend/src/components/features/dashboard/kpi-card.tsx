"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
    label: string;
    value: string | number;
    trend?: {
        value: number;
        type: "increase" | "decrease";
    };
    icon?: React.ReactNode;
    subtitle?: string;
    className?: string;
}

export function KpiCard({
    label,
    value,
    trend,
    icon,
    subtitle,
    className,
}: KpiCardProps) {
    const trendColor = trend
        ? trend.type === "increase"
            ? "text-green-500"
            : "text-red-500"
        : "";

    const trendSymbol = trend
        ? trend.type === "increase"
            ? "+"
            : "-"
        : "";

    return (
        <Card className={cn("relative overflow-hidden", className)}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <h3 className="mt-2 text-3xl font-bold tracking-tight">{value}</h3>
                        {subtitle && (
                            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
                        )}
                    </div>
                    {icon && (
                        <div className="rounded-full bg-primary/10 p-3 text-primary">
                            {icon}
                        </div>
                    )}
                </div>
                {trend && (
                    <div className="mt-4">
                        <span className={cn("text-sm font-medium", trendColor)}>
                            {trendSymbol}
                            {Math.abs(trend.value)}%
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
