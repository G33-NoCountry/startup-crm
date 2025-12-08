"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface DashboardErrorProps {
    error: Error;
    onRetry?: () => void;
}

export function DashboardError({ error, onRetry }: DashboardErrorProps) {
    return (
        <Card className="border-destructive">
            <CardContent className="flex flex-col items-center justify-center p-12">
                <div className="rounded-full bg-destructive/10 p-4 mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Error al cargar el dashboard</h3>
                <p className="text-sm text-muted-foreground text-center mb-6 max-w-md">
                    {error.message || "Ha ocurrido un error al cargar los datos. Por favor, intenta nuevamente."}
                </p>
                {onRetry && (
                    <Button onClick={onRetry} variant="outline">
                        Reintentar
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
