import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class Contact extends Model {
    public id!: number;
    public full_name!: string;
    public email!: string;
    public phone!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Contact.init(
    {
        full_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(55),
            unique: true,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "contacts",
    }
);

export default Contact;
