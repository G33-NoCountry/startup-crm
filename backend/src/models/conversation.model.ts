import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class Conversation extends Model {
    public id!: number;
    public contact_id!: number;
    public status!: boolean;
    public channel!: string;
    public last_interaction!: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Conversation.init(
    {
        contact_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: { model: "contacts" },
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        channel: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        last_interaction: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "conversations",
    }
);

export default Conversation;
