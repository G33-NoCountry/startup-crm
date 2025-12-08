import { Deal, Contact, FunnelStage, User } from "../models";
import { WhereOptions } from "sequelize";

export class DealRepository {

    public async findAllDealsPipeline(userId?: number) {

        const whereCondition: WhereOptions = {};

        if (userId) {
            whereCondition.user_id = userId;
        }

        return await Deal.findAll({
            where: whereCondition,

            attributes: ['id', 'title', 'value', 'created_at', 'updated_at'],
            include: [
                {
                    model: Contact,
                    as: 'contact',
                    attributes: ['id', 'full_name', 'email'],
                },
                {
                    model: FunnelStage,
                    as: 'funnel_stage',
                    attributes: ['id', 'title', 'sort_order', 'is_closed'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'full_name', 'avatar_color'],
                }
            ],
            order: [
                [{ model: FunnelStage, as: 'funnel_stage' }, 'sort_order', 'ASC'],
                ['updated_at', 'DESC']
            ]
        });
    }

    public async findById(id: number) {
        return await Deal.findByPk(id);
    }

    public async updateFunnelStage(dealId: number, newStageId: number) {
        const [affectedCount] = await Deal.update(
            { funnel_stage_id: newStageId },
            { where: { id: dealId } }
        );

        if (affectedCount === 0) return null;

        return await this.findById(dealId);
    }

    async findFirstFunnelStageId(): Promise<number | null> {
        const firstStage = await FunnelStage.findOne({
            where: { sort_order: 1 },
            attributes: ['id'],
            order: [['id', 'ASC']]
        });
        return firstStage ? firstStage.id : null;
    }

    async create(data: { title: string, value?: number, contact_id: number, user_id: number, funnel_stage_id: number }): Promise<Deal> {
        const newDeal = await Deal.create(data);
        return newDeal;
    }

    async update(data: any, dealId: number): Promise<Deal> {
        const result = await Deal.update(data, { where: { id: dealId } });
        if (!(result.length > 0))
            throw new Error("No se pudo actualizar el deal");

        const contactUpdated = await this.findById(dealId);
        if (!contactUpdated)
            throw new Error;
        return contactUpdated;
    }
}