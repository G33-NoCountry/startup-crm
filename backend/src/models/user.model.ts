import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";

class User extends Model {
    public id!: number;
    public full_name!: string;
    public email!: string;
    public password!: string;
    public role!: 'Admin' | 'Agente' | 'Manager';
    public status!: boolean;
    public avatar_color!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

User.init(
    {
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Agente', 'Manager'),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        avatar_color: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
    }
);

export default User;
