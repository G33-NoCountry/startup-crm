import { Request, Response, NextFunction } from "express";
import { DealService } from "../services/deal.service";
import { AssignDealDto } from "../dto/deal/assign-deal.dto";

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
     *     security:
     *       - bearerAuth: []
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

    /**
     * @swagger
     * /api/deals:
     *   post:
     *     summary: Crear un nuevo deal (oportunidad de venta)
     *     description: Crea un nuevo deal, lo asocia a un contacto y lo asigna a la primera etapa del funnel. El user_id se asigna automáticamente al usuario autenticado.
     *     tags: [Deals]
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/DealCreateRequest'
     *     responses:
     *       201:
     *         description: Deal creado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/DealCreateResponse'
     *       400:
     *         description: Error de validación (ej. falta título, contact_id no existe)
     *       401:
     *         description: No autorizado
     */
    public createDeal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userPayload = req.user as { id: number, role: string };
            const userId = userPayload.id;
            const { title, contact_id, value } = req.body;

            const newDeal = await this.dealService.createDeal(
                title,
                contact_id,
                userId,
                value
            );

            return res.status(201).json({
                success: true,
                message: "Deal creado exitosamente y asociado a la primera etapa.",
                data: newDeal.toJSON()
            });

        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     * /api/deals/{id}/assign-agent:
     *   patch:
     *     summary: Asignar agente
     *     description: Asigna un `deal` a un `usuario`
     *     tags: [Deals]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         example: 2
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: id de la Deal
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/DealAssignRequest'
     *     responses:
     *        201:
     *         description: Deal asignado exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Deal asignado exitosamente!"
     *                 data:
     *                   $ref: '#/components/schemas/FullDeal'
     *        400:
     *         description: Solicitud inválida
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/BadRequest'
     *        401:
     *         description: No autorizado
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/Unauthorized'
     *        403:
     *         description: No tiene permisos
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/Forbidden'
     *        404:
     *         description: No encontrado
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/NotFound'
     *        500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/InternalServerError'
     */
    public assignToAgent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const dto = req.body as AssignDealDto;
            dto.deal_id = parseInt(id);
            const dealUpdated = await this.dealService.assignDeal(dto);

            return res.status(200).json({
                success: true,
                message: "Deal asignado exitosamente!",
                data: dealUpdated.toJSON()
            });
        } catch (error) {
            next(error);
        }
    }
}