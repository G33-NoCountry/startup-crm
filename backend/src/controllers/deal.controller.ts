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
     *               $ref: '#/components/schemas/DealsListResponse'
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

    /**
     * @swagger
     * /api/deals/{id}/funnel-stage:
     *   put:
     *     summary: Mover deal a otra etapa (Drag & Drop)
     *     description: Actualiza la etapa del funnel.
     *     tags: [Deals]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID del Deal que vas a mover
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               funnel_stage_id:
     *                 type: integer
     *                 description: ID de la nueva etapa de destino
     *                 example: 3
     *     responses:
     *       200:
     *         description: Deal movido exitosamente
     *       403:
     *         description: No tienes permiso sobre este deal
     *       404:
     *         description: Deal no encontrado
     */

    public updateDealStage = async (req: Request, res: Response) => {
        try {
            const dealId = parseInt(req.params.id);
            const { funnel_stage_id } = req.body;
            const user = (req as any).user;

            const updatedDeal = await this.dealService.moveDealStage(
                dealId,
                funnel_stage_id,
                user.id,
                user.role
            );

            return res.status(200).json({
                success: true,
                message: "Deal movido de etapa exitosamente.",
                data: updatedDeal
            });

        } catch (error: any) {
            console.error("Error en updateDealStage:", error);

            const status = error.message.includes("No tienes permiso") ? 403 :
                error.message.includes("no encontrado") ? 404 : 500;

            return res.status(status).json({
                success: false,
                message: error.message
            });
        }
    };
}