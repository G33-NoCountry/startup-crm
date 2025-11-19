import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class DealTag extends Model {
    public deal_id!: number;
    public tag_id!: number;
}

DealTag.init(
    {
        deal_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: { model: "deals" },
        },
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: { model: "tags" },
        }
    },
    {
        sequelize,
        tableName: "deal_tag",
    }
);

export default DealTag;
