import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class Message extends Model {
    public id!: number;
    public contact_id!: number;
    public conversation_id!: number;
    public user_id!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Message.init(
    {
        contact_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "contacts" },
        },
        conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "conversations" },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users" },
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "messages",
    }
);

export default Message;
