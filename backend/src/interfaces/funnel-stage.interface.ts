import { ReorderFunnelStagesDto } from "../dto/funnel-stage/reorder-funnels.dto";
import { FunnelStage } from "../models";
import { ICrudBase } from "./crud-base.interface";

export interface IFunnelStageRepository extends ICrudBase<FunnelStage> {
    reorder(newOrder : ReorderFunnelStagesDto): Promise<FunnelStage[]>;

}