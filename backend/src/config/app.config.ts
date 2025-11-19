import { env } from "process";

export const appConfig = {
  port: env.APP_PORT ?? 3000,
  nodeEnv: env.NODE_ENV ?? "development",
  frontendUrl: env.FRONTEND_URL ?? "http://localhost:5173",
};
