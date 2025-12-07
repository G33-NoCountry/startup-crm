import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class FunnelStage extends Model {
    public id!: number;
    public title!: string;
    public sort_order!: number;
    public is_closed!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static readonly publicAttributes: string[] = [
        "id", "title", "sort_order", "is_closed"
    ];
}

FunnelStage.init(
    {
        title: {
            type: DataTypes.STRING(55),
            allowNull: false,
        },
        sort_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_closed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "funnel_stages",
    }
);

export default FunnelStage;
