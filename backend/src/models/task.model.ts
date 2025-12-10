import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { makePaginate, PaginateOptions, PaginationConnection } from "sequelize-cursor-pagination";

class Task extends Model {
    public id!: number;
    public user_id!: number;
    public deal_id!: number;
    public contact_id!: number;
    public title!: string;
    public start_date!: Date;
    public due_date!: Date;
    public color!: string;
    public status!: boolean;
    public deleted_at!: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static readonly publicAttributes: string[] = [
        "id", "title", "start_date", "due_date", "status", "color", "user_id", "deal_id", "contact_id", "created_at", "updated_at"
    ];

    declare static paginate: (options: PaginateOptions<Task>) => Promise<PaginationConnection<Task>>;
}

Task.paginate = makePaginate(Task);

Task.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "users" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        deal_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "deals" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        contact_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "contacts" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "tasks",
        paranoid: true
    }
);

export default Task;
