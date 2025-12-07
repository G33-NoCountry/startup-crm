import { FunnelStage } from "../../models";

export class FunnelStageResource {
    static toResponse(funnelStage: FunnelStage) {
        return {
            id: funnelStage.id,
            title: funnelStage.title,
            is_closed: funnelStage.is_closed,
            sort_order: funnelStage.sort_order,
            created_at: funnelStage.created_at,
            updated_at: funnelStage.updated_at,
        };
    }
}
