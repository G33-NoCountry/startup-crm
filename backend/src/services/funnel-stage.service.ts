import { ReorderFunnelStagesDto } from "../dto/funnel-stage/reorder-funnels.dto";
import { IFunnelStageRepository } from "../interfaces/funnel-stage.interface";
import { Deal, FunnelStage } from "../models";

export class FunnelStageService {

  constructor(private funnelStageRepository: IFunnelStageRepository) { }

  public async getByPk(id: number) {
    return this.funnelStageRepository.findById(id);
  }

  public async getFunnels(include?: any, where?: any) {
    return this.funnelStageRepository.findAll(include, where);
  }

  public async create(data: any): Promise<FunnelStage | null> {
    return this.funnelStageRepository.create(data);
  }

  public async update(data: any): Promise<FunnelStage | null> {
    return this.funnelStageRepository.update(data);
  }

  public async delete(funnelStage: FunnelStage): Promise<void> {
    const deals = await Deal.findAll({
      where: { funnel_stage_id: funnelStage.id }
    })
    if (deals.length > 0)
      throw new Error("No puede eliminar un Funnel asociado a un Deal");
    return this.funnelStageRepository.delete(funnelStage);
  }

  public async reorder(newOrder : ReorderFunnelStagesDto): Promise<FunnelStage[]> {
    return this.funnelStageRepository.reorder(newOrder);
  }

}
