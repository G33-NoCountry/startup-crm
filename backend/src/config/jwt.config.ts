import { env } from "process";

export const jwtConfig = {
    access_secret: env.JWT_SECRET ?? "",
    access_expire: env.JWT_EXPIRES_IN ?? "8h",
    refresh_secret: env.REFRESH_TOKEN_SECRET ?? "",
    refresh_expire: env.REFRESH_TOKEN_EXPIRES_IN ?? "7d",
};