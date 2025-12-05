import { IFunnelStageRepository } from "../interfaces/funnel-stage.interface";
import { FunnelStage } from "../models";

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

  public async delete(FunnelStage: FunnelStage): Promise<void> {
    return this.funnelStageRepository.delete(FunnelStage);
  }

}
