export class UpdateFunnelStageDto {
  constructor(
    public id: number,
    public title?: string,
    public is_closed?: boolean,
  ) { }
}
