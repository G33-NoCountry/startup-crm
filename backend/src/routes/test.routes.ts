// src/routes/test.routes.ts

import { Router } from 'express';
import { MailService } from '../services/mail.service';

const router = Router();
const mailService = new MailService(); 

// Ruta para probar solo la conexión SMTP (GET)
router.get('/test/smtp-connection', async (req, res) => {
    try {
        const result = await mailService.runConnectionTest();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: (error as Error).message });
    }
});

// Ruta para enviar un correo de prueba simple (GET)
router.get('/test/send-email', async (req, res) => {
    try {
        const result = await mailService.sendMail({
            to: 'tu_correo_personal@gmail.com', 
            subject: 'Prueba de Envío Simple - CRM',
            html: '<h1>Backend activo!</h1><p>Si recibes esto, la configuración de Gmail es correcta.</p>',
        });
        return res.status(200).json({ success: true, message: "Correo en cola de envío.", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: (error as Error).message });
    }
});

export default router;