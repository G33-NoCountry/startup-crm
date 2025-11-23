import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Endpoints para gestión de contactos
 */
export class ContactController {
  constructor(private contactService: ContactService) { }

  /**
   * @swagger
   * /api/contacts:
   *   get:
   *     summary: Obtener contactos
   *     description: Obtener datos de contactos paginados (solo para usuarios "Agente")
   *     tags: [Contacts]
   *     parameters:
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           minimum: 1
   *         required: true
   *         description: Cantidad de resultados a devolver por página.
   *
   *       - in: query
   *         name: after
   *         schema:
   *           type: string
   *         required: false
   *         description: Cursor para obtener la siguiente página.
   *
   *       - in: query
   *         name: before
   *         schema:
   *           type: string
   *         required: false
   *         description: Cursor para obtener la página anterior.
   *     security:
   *       - bearerAuth: []
   *     responses:
   *        200:
   *         description: Contactos obtenidos
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
   *                   example: "Contactos obtenidos!"
   *                 data:
   *                   $ref: '#/components/schemas/PaginateContact'
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
   *        500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/InternalServerError'
  */  
  public getContacts = async (request: Request, response: Response) => {
    try {
      const { after, limit, before } = request.query;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      const contacts = await this.contactService.getUsers(
        parsedLimit,
        after as string ?? undefined,
        before as string ?? undefined,
      );

      return response.status(200).json({
        success: true,
        message: "Contactos obtenidos!",
        data: contacts
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}