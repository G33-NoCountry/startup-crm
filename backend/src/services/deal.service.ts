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
}