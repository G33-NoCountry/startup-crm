"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KanbanBoard, NewDealDialog } from "@/components/features/kanban";
import { dealService } from "@/lib/api";
import type { Deal, DealStage } from "@/types/deal.types";
import { toast } from "sonner";
import { Plus, Search, Filter, Columns } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function KanbanPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<number[]>([1, 2, 3, 4, 5]);

  useEffect(() => {
    loadDeals();
  }, []);

  useEffect(() => {    
    let filtered = [...deals];
    
    // Filtro por búsqueda
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (deal) =>
          deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (deal.contact && deal.contact.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filtro por prioridad
    if (priorityFilter.length > 0) {
      const beforeFilter = filtered.length;
      filtered = filtered.filter(deal => {
        const hasPriority = deal.priority && priorityFilter.includes(deal.priority);
        return hasPriority;
      });
    }
    
    setFilteredDeals(filtered);
  }, [searchQuery, deals, priorityFilter, visibleColumns]);

  const loadDeals = async () => {
    try {
      setIsLoading(true);
      const data = await dealService.getAll();
      
      // Contar cuántos deals hay por prioridad
      const priorityCount = data.reduce((acc, deal) => {
        const priority = deal.priority || 'sin priority';
        acc[priority] = (acc[priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      setDeals(data);
      setFilteredDeals(data);
    } catch (error) {
      console.error("Error al cargar oportunidades:", error);
      toast.error("Error al cargar oportunidades");
    } finally {
      setIsLoading(false);
    }
  };

  const STAGE_MAP: Record<number, { id: number; title: string; sort_order: number }> = {
    1: { id: 1, title: "Prospección", sort_order: 1 },
    2: { id: 2, title: "Calificación", sort_order: 2 },
    3: { id: 3, title: "Propuesta", sort_order: 3 },
    4: { id: 4, title: "Negociación", sort_order: 4 },
    5: { id: 5, title: "Cierre", sort_order: 5 },
  };

  const handleMoveStage = async (dealId: string | number, newStageId: number) => {
    const originalDeals = [...deals];
    const originalFilteredDeals = [...filteredDeals];
    
    const newStage = STAGE_MAP[newStageId];
    
    // Convertir dealId a string para comparación consistente (drag&drop siempre es string)
    const dealIdStr = String(dealId);
    
    const updatedDeals = deals.map((deal) =>
      String(deal.id) === dealIdStr
        ? { ...deal, funnel_stage: { id: newStage.id, title: newStage.title, sort_order: newStage.sort_order, is_closed: false } }
        : deal
    );
    const updatedFilteredDeals = filteredDeals.map((deal) =>
      String(deal.id) === dealIdStr
        ? { ...deal, funnel_stage: { id: newStage.id, title: newStage.title, sort_order: newStage.sort_order, is_closed: false } }
        : deal
    );
    
    setDeals(updatedDeals);
    setFilteredDeals(updatedFilteredDeals);

    try {
      await dealService.moveStage(dealId, newStageId);
      toast.success("Oportunidad movida correctamente");
    } catch (error) {
      setDeals(originalDeals);
      setFilteredDeals(originalFilteredDeals);
      console.error("Error al mover oportunidad:", error);
      toast.error("Error al mover oportunidad. Se revirtió el cambio.");
    }
  };

  const handleDelete = async (dealId: string | number) => {
    if (!confirm("¿Estás seguro de eliminar esta oportunidad?")) return;

    const originalDeals = [...deals];
    const originalFilteredDeals = [...filteredDeals];
    
    const dealIdStr = String(dealId);

    setDeals(deals.filter(d => String(d.id) !== dealIdStr));
    setFilteredDeals(filteredDeals.filter(d => String(d.id) !== dealIdStr));

    try {
      await dealService.delete(String(dealId));
      toast.success("Oportunidad eliminada correctamente");
    } catch (error) {
      setDeals(originalDeals);
      setFilteredDeals(originalFilteredDeals);
      console.error("Error al eliminar oportunidad:", error);
      toast.error("Error al eliminar oportunidad");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-[600px] w-[320px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full gap-4 overflow-hidden">
      <div className="flex flex-col gap-3 sm:gap-4 shrink-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl sm:text-2xl font-semibold">Pipeline de ventas</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Visualiza y gestiona tus oportunidades en cada etapa del proceso de ventas.</p>
          </div>

          <Button onClick={() => setIsNewDialogOpen(true)} size="default" className="bg-primary text-white w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nueva oportunidad
          </Button>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar oportunidades"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="shrink-0 gap-2">
                <Columns className="h-4 w-4" />
                <span className="hidden sm:inline">Columnas</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes(1)}
                onCheckedChange={(checked) => {
                  setVisibleColumns(checked 
                    ? [...visibleColumns, 1]
                    : visibleColumns.filter(c => c !== 1)
                  );
                }}
              >
                Prospección
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes(2)}
                onCheckedChange={(checked) => {
                  setVisibleColumns(checked 
                    ? [...visibleColumns, 2]
                    : visibleColumns.filter(c => c !== 2)
                  );
                }}
              >
                Calificación
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes(3)}
                onCheckedChange={(checked) => {
                  setVisibleColumns(checked 
                    ? [...visibleColumns, 3]
                    : visibleColumns.filter(c => c !== 3)
                  );
                }}
              >
                Propuesta
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes(4)}
                onCheckedChange={(checked) => {
                  setVisibleColumns(checked 
                    ? [...visibleColumns, 4]
                    : visibleColumns.filter(c => c !== 4)
                  );
                }}
              >
                Negociación
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={visibleColumns.includes(5)}
                onCheckedChange={(checked) => {
                  setVisibleColumns(checked 
                    ? [...visibleColumns, 5]
                    : visibleColumns.filter(c => c !== 5)
                  );
                }}
              >
                Cierre
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 min-h-0 w-full">
        <KanbanBoard
          deals={filteredDeals}
          onMoveStage={handleMoveStage}
          onDelete={handleDelete}
          visibleColumns={visibleColumns}
        />
      </div>

      <NewDealDialog
        open={isNewDialogOpen}
        onOpenChange={setIsNewDialogOpen}
        onSuccess={loadDeals}
      />
    </div>
  );
}