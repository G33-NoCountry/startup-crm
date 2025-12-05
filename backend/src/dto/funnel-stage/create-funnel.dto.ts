export class CreateFunnelStageDto {
  constructor(
    public title: string,
    public is_closed: boolean,
    public sort_order: number,
  ) { }
}
