import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class Tag extends Model {
    public id!: number;
    public title!: string;
    public color!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static readonly publicAttributes: string[] = [
        "id", "title", "color"
    ];

}

Tag.init(
    {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(55),
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tags",
    }
);

export default Tag;
