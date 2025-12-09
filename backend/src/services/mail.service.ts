// src/services/mail.service.ts

import { transporter } from '../config/mail.config';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { Request, Response } from 'express'; // Necesario para el controlador temporal

// Tipos para los datos del correo
interface MailData {
    to: string; // Correo de destino
    subject: string;
    html: string; // Contenido del correo (puede ser HTML o texto plano)
}

export class MailService {

    /**
     * Envía un correo electrónico genérico.
     */
    public async sendMail(data: MailData) {

        const mailOptions: MailOptions = {
            from: transporter.options.from,
            to: data.to,
            subject: data.subject,
            html: data.html,
        };

        try {
            // Nodemailer intenta conectarse y enviar
            const info = await transporter.sendMail(mailOptions);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('❌ MailService Error:', error);
            // Arroja el error para que el controlador lo capture
            throw new Error('Fallo al enviar el correo. Verifique las credenciales/conexión.');
        }
    }

    // Función de prueba temporal que usaremos para verificar la conexión
    public async runConnectionTest() {
        console.log('--- Iniciando prueba de conexión SMTP ---');
        try {
            // Usamos Nodemailer para verificar la conexión sin enviar un correo real
            await transporter.verify();
            console.log('✅ Conexión SMTP exitosa. El servidor está listo para recibir correos.');
            return { success: true, message: "Conexión SMTP exitosa." };
        } catch (error) {
            console.error('❌ Error de conexión SMTP:', (error as Error).message);
            throw new Error('Error de conexión SMTP. Verifique las credenciales y el App Password.');
        }
    }
}