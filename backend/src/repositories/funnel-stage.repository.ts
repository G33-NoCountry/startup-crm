import { IFunnelStageRepository } from "../interfaces/funnel-stage.interface";
import { FunnelStage } from "../models";

export class FunnelStageRepository implements IFunnelStageRepository {
    async findById(id: number) {
        return FunnelStage.findByPk(id);
    }

    async findAll(
        include?: any,
        where?: any
    ): Promise<FunnelStage[] | null> {
        const result = await FunnelStage.findAll({
            include: include,
            attributes: FunnelStage.publicAttributes,
            where,
            order: [['sort_order', 'ASC']],
        });

        if (!(result.length > 0))
            return null;

        return result;
    }

    async create(data: any): Promise<FunnelStage | null> {
        return FunnelStage.create(data);
    }

    async update(data: any): Promise<FunnelStage | null> {
        const result = await FunnelStage.update(data, {
            where: { id: data.id }
        });

        if (!(result.length > 0))
            return null;
        const FunnelStageUpdated = await this.findById(data.id);
        return FunnelStageUpdated;
    }

    async delete(FunnelStage: FunnelStage): Promise<void> {
        return FunnelStage.destroy();
    }
}
