import { DealRepository } from "../repositories/deal.repository";
import Deal from '../models/deal.model';

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

    async createDeal(title: string, contactId: number, userId: number, value?: number): Promise<Deal> {
        //Encontrar la primera etapa del funnel 

        const firstStageId = await this.dealRepository.findFirstFunnelStageId();

        if (!firstStageId) {
            throw new Error("Configuración incompleta: No se encontró la primera etapa del funnel (sort_order = 1).");
        }

        // 2. Preparar datos y crear el deal
        const dealData = {
            title: title,
            value: value,
            contact_id: contactId,
            user_id: userId, // ID del usuario autenticado
            funnel_stage_id: firstStageId // Primera etapa del funnel
        };

        const newDeal = await this.dealRepository.create(dealData);

        // Opcional: Recarga el deal con sus relaciones para la respuesta
        // const dealWithRelations = await this.dealRepository.findById(newDeal.id);

        return newDeal; // O dealWithRelations si recargas.
    }
}