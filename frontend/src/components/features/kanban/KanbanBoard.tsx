"use client";

import { memo, useMemo, useCallback } from "react";
import { KanbanColumn } from "./KanbanColumn";
import type { Deal } from "@/types/deal.types";

interface KanbanBoardProps {
  deals: Deal[];
  onEdit?: (deal: Deal) => void;
  onDelete?: (dealId: string | number) => void;
  onMoveStage?: (dealId: string | number, newStageId: number) => void;
  visibleColumns?: number[];
}

const DEFAULT_STAGES = [
  { id: 1, title: "Prospección", sort_order: 1, color: "red" },
  { id: 2, title: "Calificación", sort_order: 2, color: "orange" },
  { id: 3, title: "Propuesta", sort_order: 3, color: "blue" },
  { id: 4, title: "Negociación", sort_order: 4, color: "purple" },
  { id: 5, title: "Cierre", sort_order: 5, color: "green" },
] as const;

function KanbanBoardComponent({ deals, onEdit, onDelete, onMoveStage, visibleColumns = [1, 2, 3, 4, 5] }: KanbanBoardProps) {
  
  const dealsByStage = useMemo(() => {
    const grouped: Record<number, Deal[]> = {};
    
    DEFAULT_STAGES.forEach(stage => {
      grouped[stage.id] = deals.filter(deal => deal.funnel_stage?.id === stage.id);
    });
    
    return grouped;
  }, [deals]);

  const totalsByStage = useMemo(() => {
    const totals: Record<number, number> = {};
    
    DEFAULT_STAGES.forEach(stage => {
      totals[stage.id] = dealsByStage[stage.id]?.reduce(
        (sum, deal) => sum + (deal.value || 0), 
        0
      ) || 0;
    });
    
    return totals;
  }, [dealsByStage]);

  const handleDrop = useCallback((dealId: string, newStageId: number) => {
    if (onMoveStage) {
      onMoveStage(dealId, newStageId);
    }
  }, [onMoveStage]);

  return (
    <div className="h-full max-w-full overflow-x-auto overflow-y-hidden pb-4">
      <div className="flex gap-3 sm:gap-4 h-full">
        {DEFAULT_STAGES.filter(stage => visibleColumns.includes(stage.id)).map((stage) => (
          <KanbanColumn
            key={stage.id}
            title={stage.title}
            deals={dealsByStage[stage.id] || []}
            totalValue={totalsByStage[stage.id] || 0}
            color={stage.color}
            stageId={stage.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </div>
  );
}

export const KanbanBoard = memo(KanbanBoardComponent);
