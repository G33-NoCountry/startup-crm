import { transporter } from '../config/mail.config';
import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { Request, Response } from 'express'; 

interface MailData {
    to: string; 
    subject: string;
    html: string; 
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
            const info = await transporter.sendMail(mailOptions);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('❌ MailService Error:', error);
            throw new Error('Fallo al enviar el correo. Verifique las credenciales/conexión.');
        }
    }

    // Función de prueba temporal que usaremos para verificar la conexión
    public async runConnectionTest() {
        console.log('--- Iniciando prueba de conexión SMTP ---');
        try {
            await transporter.verify();
            console.log('✅ Conexión SMTP exitosa. El servidor está listo para recibir correos.');
            return { success: true, message: "Conexión SMTP exitosa." };
        } catch (error) {
            console.error('❌ Error de conexión SMTP:', (error as Error).message);
            throw new Error('Error de conexión SMTP. Verifique las credenciales y el App Password.');
        }
    }
}