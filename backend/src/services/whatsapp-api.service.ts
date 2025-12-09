import { whatsappApiConfig } from '../config/whatsapp-api.config';

export class WhatsAppApiService {

    public async sendMessage(data: string) {
        const message = {
            messaging_product: "whatsapp",
            to: "54111522341558",
            type: "text",
            text: {
                body: data
            }
        };

        const headers = {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${whatsappApiConfig.ACCESS_TOKEN}`
        };

        try {
            const info = await fetch(whatsappApiConfig.URL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(message)
            });

            const response = await info.json();

            return {
                success: true,
                data: response
            };
        } catch (error) {
            console.error('❌ WhatsApp Error:', error);
            throw new Error('Fallo al enviar el mensaje. Verifique las credenciales/conexión.');
        }
    }
}