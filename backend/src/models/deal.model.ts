import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class Deal extends Model {
    public id!: number;
    public user_id!: number;
    public contact_id!: number;
    public funnel_stage_id!: number;
    public title!: string;
    public value!: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Deal.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users" },
        },
        contact_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "contacts" },
        },
        funnel_stage_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "funnel_stages" },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        value: {
            type: DataTypes.DOUBLE(12, 2),
        },
    },
    {
        sequelize,
        tableName: "deals",
    }
);

export default Deal;
