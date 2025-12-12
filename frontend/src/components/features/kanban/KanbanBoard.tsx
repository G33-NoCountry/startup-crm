"use client";

import { memo, useMemo, useCallback } from "react";
import { KanbanColumn } from "./KanbanColumn";
import type { Deal } from "@/types/deal.types";

interface KanbanBoardProps {
  deals: Deal[];
  stageIdByPosition: Record<number, number>;
  onEdit?: (deal: Deal) => void;
  onDelete?: (dealId: string | number) => void;
  onMoveStage?: (dealId: string | number, newStageId: number) => void;
  visibleColumns?: number[];
}

const DEFAULT_STAGES = [
  { position: 1, title: "Prospección", color: "red" },
  { position: 2, title: "Calificación", color: "orange" },
  { position: 3, title: "Propuesta", color: "blue" },
  { position: 4, title: "Negociación", color: "purple" },
  { position: 5, title: "Cierre", color: "green" },
] as const;

function KanbanBoardComponent({ deals, stageIdByPosition, onEdit, onDelete, onMoveStage, visibleColumns = [1, 2, 3, 4, 5] }: KanbanBoardProps) {

  const dealsByPosition = useMemo(() => {
    const grouped: Record<number, Deal[]> = {};
    
    console.log('🔍 DEBUG Deals:', deals.map(d => ({
      id: d.id,
      title: d.title,
      funnel_stage: d.funnel_stage
    })));
    
    DEFAULT_STAGES.forEach(stage => {
      grouped[stage.position] = deals.filter(
        deal => deal.funnel_stage?.sort_order === stage.position
      );
    });
    
    console.log('📊 Deals agrupados por posición:', grouped);
    
    return grouped;
  }, [deals]);

  const totalsByPosition = useMemo(() => {
    const totals: Record<number, number> = {};
    
    DEFAULT_STAGES.forEach(stage => {
      totals[stage.position] = dealsByPosition[stage.position]?.reduce(
        (sum, deal) => sum + (deal.value || 0), 
        0
      ) || 0;
    });
    
    return totals;
  }, [dealsByPosition]);

  const handleDrop = useCallback((dealId: string, targetPosition: number) => {
    const targetStageId = stageIdByPosition[targetPosition];
    
    if (onMoveStage && targetStageId) {
      onMoveStage(dealId, targetStageId);
    }
  }, [onMoveStage, stageIdByPosition]);

  return (
    <div className="h-full max-w-full overflow-x-auto overflow-y-hidden pb-4">
      <div className="flex gap-3 sm:gap-4 h-full">
        {DEFAULT_STAGES.filter(stage => visibleColumns.includes(stage.position)).map((stage) => (
          <KanbanColumn
            key={stage.position}
            title={stage.title}
            deals={dealsByPosition[stage.position] || []}
            totalValue={totalsByPosition[stage.position] || 0}
            color={stage.color}
            stageId={stage.position}
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
