import { Request, Response } from "express";
import { DealService } from "../services/deal.service";

export class DealController {
    private dealService: DealService;

    constructor(dealService: DealService) {
        this.dealService = dealService;
    }

    /**
     * @swagger
     * /api/deals:
     *   get:
     *     summary: Obtener pipeline de ventas (Kanban)
     *     description: Devuelve todos los deals activos agrupados por etapa. 
     *       Agentes ven solo los suyos; Admin/Manager ven todos.
     *     tags: [Deals]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Pipeline obtenido exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/models/deal/DealsListResponse'
     *       401:
     *         description: No autorizado
     *       403:
     *         description: Rol no permitido
     *       500:
     *         description: Error interno del servidor
     */

    public getDeals = async (req: Request, res: Response) => {
        try {
            const user = (req as any).user;
            const deals = await this.dealService.getDeals(user.id, user.role);

            return res.status(200).json({
                success: true,
                message: "Pipeline de ventas obtenido correctamente.",
                data: deals
            });
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Error interno",
                error: error.message
            });
        }
    };
}