import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class Template extends Model {
    public id!: number;
    public user_id!: number;
    public title!: string;
    public channel!: 'whatsapp' | 'email';
    public content!: string;
    public status!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Template.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users" },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        channel: {
            type: DataTypes.ENUM('whatsapp', 'email'),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "templates",
        underscored: true
    }
);

export default Template;
