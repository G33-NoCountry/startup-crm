"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types/dashboard";
import { cn } from "@/lib/utils";
import { AlertCircle, Clock, Users } from "lucide-react";

interface UpcomingTasksProps {
    tasks: Task[];
    onManage?: () => void;
}

const priorityConfig = {
    high: {
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        icon: AlertCircle,
    },
    medium: {
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
        icon: Clock,
    },
    low: {
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        icon: Users,
    },
};

export function UpcomingTasks({ tasks, onManage }: UpcomingTasksProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Próximas tareas</CardTitle>
                    <Button
                        variant="link"
                        className="h-auto p-0 text-sm text-primary"
                        onClick={onManage}
                    >
                        Gestionar
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-4">
                        No hay tareas pendientes
                    </p>
                ) : (
                    tasks.map((task) => {
                        const config = priorityConfig[task.priority];
                        const Icon = config.icon;

                        return (
                            <div
                                key={task.id}
                                className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
                            >
                                <div
                                    className={cn(
                                        "flex h-8 w-8 items-center justify-center rounded-full",
                                        config.bgColor
                                    )}
                                >
                                    <Icon className={cn("h-4 w-4", config.color)} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {task.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Cliente: {task.client}
                                    </p>
                                    <p className={cn("text-xs font-medium", config.color)}>
                                        {task.dueDate}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
}
