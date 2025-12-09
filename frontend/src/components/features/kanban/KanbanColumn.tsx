"use client";

import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { DealCard } from "./DealCard";
import type { Deal } from "@/types/deal.types";

interface KanbanColumnProps {
  title: string;
  deals: Deal[];
  totalValue: number;
  color?: string;
  onEdit?: (deal: Deal) => void;
  onDelete?: (dealId: string | number) => void;
  onDrop?: (dealId: string, newStageId: number) => void;
  stageId: number;
}

const colorMap: Record<string, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  green: "bg-green-500",
  gray: "bg-gray-500",
};

function KanbanColumnComponent({
  title,
  deals,
  totalValue,
  color = "gray",
  onEdit,
  onDelete,
  onDrop,
  stageId,
}: KanbanColumnProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const target = e.currentTarget as HTMLElement;
    target.classList.add("ring-2", "ring-primary", "ring-opacity-50", "bg-primary/5");
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove("ring-2", "ring-primary", "ring-opacity-50", "bg-primary/5");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    target.classList.remove("ring-2", "ring-primary", "ring-opacity-50", "bg-primary/5");
    const dealId = e.dataTransfer.getData("dealId");
    if (dealId && onDrop) {
      onDrop(dealId, stageId);
    }
  };

  const handleDragStart = (e: React.DragEvent, dealId: string | number) => {
    e.dataTransfer.setData("dealId", String(dealId));
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex flex-col h-full w-[260px] sm:w-[280px] md:w-[300px] shrink-0 bg-background border rounded-lg transition-colors"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="px-4 py-3 border-b bg-muted/30 rounded-t-lg shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${colorMap[color] || colorMap.gray}`} />
          <h3 className="font-semibold text-sm">{title}</h3>
          <Badge variant="secondary" className="text-xs ml-auto">
            {deals.length}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {formatCurrency(totalValue)}
        </p>
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-0">
        {deals.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            Sin oportunidades
          </div>
        ) : (
          deals.map((deal) => (
            <div
              key={deal.id}
              draggable
              onDragStart={(e) => handleDragStart(e, String(deal.id))}
            >
              <DealCard deal={deal} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export const KanbanColumn = memo(KanbanColumnComponent);
