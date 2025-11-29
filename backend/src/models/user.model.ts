import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { LazyPaginationConnection, makePaginate, makePaginateLazy, PaginateOptions, PaginationConnection } from "sequelize-cursor-pagination";

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
    public static readonly publicAttributes: string[] = [
        "id", "full_name", "email", "role", "status", "avatar_color", "created_at", "updated_at"
    ];

    declare static paginate: (options: PaginateOptions<User>) => Promise<PaginationConnection<User>>;
    declare static paginateLazy: (options: PaginateOptions<User>) => LazyPaginationConnection<User>;

    public checkRole(role: 'Admin' | 'Agente' | 'Manager') {
        return this.role == role;
    }
}

User.paginate = makePaginate(User);
User.paginateLazy = makePaginateLazy(User);

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
