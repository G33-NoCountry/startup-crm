import { Request, Response } from "express";
import { MetricService } from "../services/metric.service";
import { User } from "../models";

/**
 * @swagger
 * tags:
 *   name: KPIs
 *   description: Endpoints para consultar métricas
 */
export class MetricController {
  constructor(
    private metricService: MetricService
  ) { }


  public getMetrics = async (request: Request, response: Response) => {
    try {
      const { id } = request.user as User;
      const metrics = await this.metricService.getMetrics({
        user_id: id
      });

      return response.status(200).json({
        success: true,
        message: "Metricas obtenidas!",
        data: metrics
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };


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

  public getPendingTasks = async (request: Request, response: Response) => {
    try {
      const { id } = request.user as User;
      const pendingTasks = await this.metricService.getPendingTasks(id);

      return response.status(200).json({
        success: true,
        message: "Tasks obtenidas!",
        data: {
          pending_tasks: pendingTasks
        }
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

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