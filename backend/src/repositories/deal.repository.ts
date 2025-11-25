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
}