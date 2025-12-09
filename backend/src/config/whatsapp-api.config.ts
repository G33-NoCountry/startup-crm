import { env } from "process";

export const whatsappApiConfig = {
   URL: env.WHATSAPP_API_URL ?? "",
   ACCESS_TOKEN: env.WHATSAPP_API_ACCCESS_TOKEN ?? "",
};