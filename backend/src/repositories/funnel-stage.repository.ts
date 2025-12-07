import { ReorderFunnelStagesDto } from "../dto/funnel-stage/reorder-funnels.dto";
import { IFunnelStageRepository } from "../interfaces/funnel-stage.interface";
import { FunnelStage, sequelize } from "../models";

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

        return result;
    }

    async create(data: any): Promise<FunnelStage | null> {
        const lastFunnel = await FunnelStage.findOne({
            order: [["id", "DESC"]],
        });
        if (!lastFunnel)
            throw new Error("No se pudo obtener el funnel");
        data.sort_order = lastFunnel?.sort_order + 1;

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

    async reorder(newOrder: ReorderFunnelStagesDto): Promise<FunnelStage[]> {
        const transaction = await sequelize.transaction();
        try {
            for (const funnel of newOrder.funnels) {
                await FunnelStage.update(
                    { sort_order: funnel.sort_order },
                    { where: { id: funnel.id }, transaction }
                );
            }

            await transaction.commit();
            const funnels = await this.findAll();
            if (!funnels)
                throw new Error("No se pudieron obtener los registros");
            return funnels;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }

        return [];
    }
}
