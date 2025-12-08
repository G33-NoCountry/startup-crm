import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class ContactTag extends Model {
    public contact_id!: number;
    public tag_id!: number;
}

ContactTag.init(
    {
        contact_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: { model: "contacts" },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: { model: "tags" },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    },
    {
        sequelize,
        tableName: "contact_tag",
        timestamps: false
    }
);

export default ContactTag;
