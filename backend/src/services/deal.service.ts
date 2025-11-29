import { DealRepository } from "../repositories/deal.repository";

export class DealService {
    // Definimos la propiedad
    private dealRepository: DealRepository;

    // ACEPTAR el repositorio como argumento
    constructor(dealRepository: DealRepository) {
        this.dealRepository = dealRepository;
    }

    public async getDeals(userId: number, role: string) {
        const filterUserId = (role === 'Agente') ? userId : undefined;
        return await this.dealRepository.findAllDealsPipeline(filterUserId);
    }

    public async moveDealStage(dealId: number, newStageId: number, userId: number, role: string) {
        //Verificar que el deal exista
        const deal = await this.dealRepository.findById(dealId);

        if (!deal) {
            throw new Error("Deal no encontrado");
        }

        //Validación de Seguridad: Si es Agente, solo puede mover SUS deals
        if (role === 'Agente' && deal.user_id !== userId) {
            throw new Error("No tienes permiso para mover este deal");
        }

        //Proceder al movimiento
        const updatedDeal = await this.dealRepository.updateFunnelStage(dealId, newStageId);

        if (!updatedDeal) {
            throw new Error("No se pudo actualizar la etapa del deal");
        }

        return updatedDeal;
    }
}