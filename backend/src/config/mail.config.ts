
import nodemailer from 'nodemailer';
import { env } from 'process';

// Cargar las variables de entorno
const mailConfig = {
    host: env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(env.SMTP_PORT || '465', 10),
    secure: true, 
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS, 
    },
    from: env.MAIL_FROM || 'no-reply@connectflow.com',
};

// Crear el transportador
export const transporter = nodemailer.createTransport(mailConfig);