import { NextFunction, Request, Response } from "express";
import { TemplateService } from "../services/template.service";
import { validationResult } from "express-validator";

interface SendMailBody {
    templateId: number;
    toEmail: string;
    subject: string;
    contactData: any; 
}

export class MessageController {
    constructor(private templateService: TemplateService) { }

    /**
 * @swagger
 * /api/messages/send-email:
 *   post:
 *     summary: Enviar correo usando plantilla (Vía SMTP/Gmail)
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               templateId:
 *                 type: integer
 *                 example: 1
 *               toEmail:
 *                 type: string
 *                 example: "usuario@destino.com"
 *               subject:
 *                 type: string
 *                 example: "¡Nueva Propuesta!"
 *               contactData:
 *                 type: object
 *                 example: { Nombre: "Juan", Oferta: "5000 USD" }
 *     responses:
 *       200:
 *         description: Correo enviado exitosamente
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
 *                   example: "Correo enviado exitosamente."
 *       500:
 *         description: Error de conexión con el servidor SMTP/Gmail.
 */

    public sendMailFromTemplate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { templateId, toEmail, subject, contactData } = req.body as SendMailBody;

            const result = await this.templateService.sendEmailByTemplate(
                templateId,
                toEmail,
                subject,
                contactData
            );

            return res.status(200).json({
                success: true,
                message: "Correo enviado exitosamente.",
                data: result
            });

        } catch (error) {
            const status = (error as Error).message.includes("no encontrada") ? 404 : 500;
            return res.status(status).json({
                success: false,
                message: (error as Error).message,
            });
        }
    }
}