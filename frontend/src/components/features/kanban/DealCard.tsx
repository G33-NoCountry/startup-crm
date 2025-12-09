"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreVertical, User as UserIcon } from "lucide-react";
import type { Deal } from "@/types/deal.types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DealCardProps {
  deal: Deal;
  onEdit?: (deal: Deal) => void;
  onDelete?: (dealId: string | number) => void;
}

const priorityColors = {
  high: "bg-green-100 text-green-700 border-green-200",
  medium: "bg-orange-100 text-orange-700 border-orange-200",
  low: "bg-red-100 text-red-700 border-red-200",
};

const priorityLabels = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

function DealCardComponent({ deal, onEdit, onDelete }: DealCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getDaysUntil = (dateString?: string) => {
    if (!dateString) return null;
    const today = new Date();
    const closeDate = new Date(dateString);
    const diffTime = closeDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  

  const daysUntil = getDaysUntil(deal.expected_close_date);

  return (
    <Card className="group cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 active:opacity-70 active:rotate-2 py-1">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm flex-1 line-clamp-2">{deal.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            {/* <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(deal)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(deal.id)} 
                className="text-destructive"
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent> */}
          </DropdownMenu>
        </div>

        {deal.contact && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <UserIcon className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{deal.contact.full_name}</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <span className="text-xl font-semibold">{formatCurrency(deal.value)}</span>
          {deal.priority && (
            <Badge
              variant="outline"
              className={priorityColors[deal.priority]}
            >
              {priorityLabels[deal.priority]}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Avatar className="h-8 w-8 bg-accent">
            <AvatarFallback className="text-xs font-medium text-white bg-accent">
              {deal.contact ? getInitials(deal.contact.full_name) : "??"}
            </AvatarFallback>
          </Avatar>
          {daysUntil !== null && (
            <div className="text-xs text-muted-foreground">
              Vence en {daysUntil} {daysUntil === 1 ? 'día' : 'días'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export const DealCard = memo(DealCardComponent);
