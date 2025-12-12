import { Request, Response } from "express";
import { MetricService } from "../services/metric.service";
import { User } from "../models";

/**
 * @swagger
 * tags:
 *   name: KPIs
 *   description: Endpoints para consultar métricas (solo acceden usuarios "Admin", "Agente", "Manager")
 */
export class MetricController {
  constructor(
    private metricService: MetricService
  ) { }

  /**
   * @swagger
   * /api/dashboard/metrics:
   *   get:
   *     summary: Ver métricas
   *     description: Obtener métricas de la aplicación
   *     tags: [KPIs]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: Metricas obtenidas
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
   *                   example: "Metricas obtenidas!"
   *                 data:
   *                   $ref: '#/components/schemas/Metrics'
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
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public getMetrics = async (request: Request, response: Response) => {
    try {
      const { id } = request.user as User;
      const metrics = await this.metricService.getMetrics({
        user_id: id
      });

      return response.status(200).json({
        success: true,
        message: "Metricas obtenidas!",
        data: {
          activeLeads: metrics.total_active_contacts || 0,
          conversations: metrics.sent_messages?.overall || 0,
          conversationsToday: metrics.sent_messages?.by_user || 0,
          conversionRate: metrics.response_rate || 0,
          totalContacts: metrics.total_active_contacts || 0,
          pipelineValue: metrics.pipeline_value || 0,
        }
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * @swagger
   * /api/dashboard/funnel-progress:
   *   get:
   *     summary: 
   *     description:
   *     tags: [KPIs]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: 
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
   *                   example: "Funnel obtenidos!"
   *                 data:
   *                   $ref: '#/components/schemas/FunnelProgress'
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
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public getFunnelProgress = async (request: Request, response: Response) => {
    try {
      const funnelProgress = await this.metricService.getFunnelProgress();

      return response.status(200).json({
        success: true,
        message: "Funnel obtenidos!",
        data: funnelProgress
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * @swagger
   * /api/dashboard/pending-tasks:
   *   get:
   *     summary: 
   *     description:
   *     tags: [KPIs]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: 
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
   *                   example: "Tasks obtenidas!"
   *                 data:
   *                   $ref: '#/components/schemas/PendingTasks'
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
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public getPendingTasks = async (request: Request, response: Response) => {
    try {
      const { id } = request.user as User;
      const pendingTasks = await this.metricService.getPendingTasks(id);

      return response.status(200).json({
        success: true,
        message: "Tasks obtenidas!",
        data: pendingTasks
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * @swagger
   * /api/dashboard/recent-activity:
   *   get:
   *     summary: 
   *     description:
   *     tags: [KPIs]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: 
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
   *                   example: "Actividad reciente"
   *                 data:
   *                   $ref: '#/components/schemas/RecentActivity'
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
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */
  public getRecentActivity = async (request: Request, response: Response) => {
    try {
      const { id } = request.user as User;
      const recentActivity = await this.metricService.getRecentActivity(id);

      return response.status(200).json({
        success: true,
        message: "Actividad reciente",
        data: {
          recent_activity: recentActivity
        }
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}