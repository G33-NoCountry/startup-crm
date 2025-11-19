import { env } from "process";
import { Sequelize } from "sequelize";

export const sequelize: Sequelize = new Sequelize({
    host: env.DB_HOST ?? "localhost",
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 3306,
    username: env.DB_USERNAME ?? "root",
    password: env.DB_PASSWORD ?? "",
    database: env.DB_NAME ?? "db",
    dialect: 'mysql',
    logging: false,
    define:{
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});