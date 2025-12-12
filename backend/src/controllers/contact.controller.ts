import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import { Tag } from "../models";
import { RegisterContactDto } from "../dto/contact/register-contact.dto";
import { ContactResource } from "../resources/contact/contact-resource.resource";
import { UpdateContactDto } from "../dto/contact/update-contact.dto";
import { ContactRequest } from "../request/contact.request";
import { ConversationService } from "../services/conversation.service";

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Endpoints para gestión de contactos
 */
export class ContactController {
  constructor(
    private contactService: ContactService,
    private conversationService: ConversationService,
  ) { }

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
   * 
   *       - in: query
   *         name: funnel_stage_id
   *         schema:
   *           type: integer
   *           minimum: 1
   *         required: false
   *         description: Id del funnel stage para filtrar contactos
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
      const { after, limit, before, funnel_stage_id } = request.query;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      
      let contactsId: any[] = [];
      if (funnel_stage_id) {
        try {
          contactsId = await this.contactService.filterContactsByFunnelStageId(parseInt(funnel_stage_id as string));
        } catch (filterError) {
          console.warn("Error al filtrar por funnel_stage_id, ignorando filtro:", filterError);
        }
      }

      const contacts = await this.contactService.getContacts(
        parsedLimit,
        after as string ?? undefined,
        before as string ?? undefined,
        [
          {
            model: Tag,
            as: "tags",
            attributes: ["id", "title", "color"],
            through: { attributes: [] }
          }
        ],
        contactsId.length > 0 ? { id: contactsId.map(i => i.id) } : {}
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

  /**
   * @swagger
   * /api/contacts:
   *   post:
   *     summary: Registra un nuevo contacto
   *     description: Crea un registro de contacto (solo para usuarios "Agente")
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterContactRequest'
   *     responses:
   *        201:
   *         description: Contacto creado exitosamente
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
   *                   example: "Contacto creado!"
   *                 data:
   *                   $ref: '#/components/schemas/FullContact'
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
  public registerContact = async (request: Request, response: Response) => {
    try {
      const body = request.body as RegisterContactDto;
      const contact = await this.contactService.create(body);

      if (!contact)
        throw new Error("No se registro el contacto");

      return response.status(201).json({
        success: true,
        message: "Contacto creado!",
        data: ContactResource.toResponse(contact)
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
   * /api/contacts/{id}:
   *   get:
   *     summary: Obtener contacto
   *     description: Obtener datos de un contacto (solo para usuarios "Agente")
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id del contacto
   *     responses:
   *        200:
   *         description: Contacto obtenido
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
   *                   example: "Contacto obtenido!"
   *                 data:
   *                   $ref: '#/components/schemas/FullContact'
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
  public getContact = async (request: Request, response: Response) => {
    try {
      const contactId = parseInt(request.params.id);
      const contact = await this.contactService.getByPk(contactId);

      if (!contact)
        throw new Error;

      return response.status(200).json({
        success: true,
        message: "Contacto obtenido!",
        data: ContactResource.toResponse(contact)
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
   * /api/contacts/{id}:
   *   put:
   *     summary: Actualizar contacto
   *     description: Actualizar datos de un contacto (solo para usuarios "Agente")
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id del contacto
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateContactRequest'
   *     responses:
   *        200:
   *         description: Contacto actualizado
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
   *                   example: "Contacto actualizado!"
   *                 data:
   *                   $ref: '#/components/schemas/FullContact'
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
  public updateContact = async (request: Request, response: Response) => {
    try {
      const contactId = parseInt(request.params.id);
      const body = request.body as UpdateContactDto;
      body.id = contactId;
      const contactUpdated = await this.contactService.update(body);
      if (!contactUpdated)
        throw new Error("No se pudo actualizar el contacto");

      return response.status(200).json({
        success: true,
        message: "Contacto actualizado!",
        data: ContactResource.toResponse(contactUpdated)
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
   * /api/contacts/{id}:
   *   delete:
   *     summary: Eliminar contacto
   *     description: Elimina el registro de un contacto
   *     tags: [Contacts]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id del contacto
   *     responses:
   *        204:
   *         description: Contacto eliminado (sin respuesta)
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
  public deleteContact = async (request: Request, response: Response) => {
    try {
      const contact = (request as ContactRequest).contact;
      await this.contactService.delete(contact);

      return response.status(204).send();
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  /**
   * @swagger
   * /api/contacts/{id}/conversations:
   *   get:
   *     summary: Obtener conversaciones según el `id` de un contacto 
   *     description: Obtener datos de conversaciones paginados (solo para usuarios "Agente")
   *     tags: [Contacts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           minimum: 1
   *         description: id del contacto
   * 
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
   *         description: Conversaciones obtenidos
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
   *                   example: "Conversaciones obtenidas!"
   *                 data:
   *                   $ref: '#/components/schemas/PaginateConversation'
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
  public getCoversationsByContactId = async (request: Request, response: Response) => {
    try {
      const { after, limit, before } = request.query;
      const parsedLimit = limit ? parseInt(limit as string, 10) : undefined;
      const contactId = parseInt(request.params.id);
      const conversations = await this.conversationService.getConversations(
        parsedLimit,
        after as string ?? undefined,
        before as string ?? undefined,
        [], { contact_id: contactId }
      );

      return response.status(200).json({
        success: true,
        message: "Conversaciones obtenidas!",
        data: conversations
      });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

}