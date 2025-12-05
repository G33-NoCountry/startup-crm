interface FunnelStageOrder {
  id: number;
  sort_order: number;
}

export class ReorderFunnelStagesDto {
  constructor(
    public funnels: FunnelStageOrder[]
  ) { }
}
