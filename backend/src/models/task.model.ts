import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { makePaginate, PaginateOptions, PaginationConnection } from "sequelize-cursor-pagination";

class Task extends Model {
    public id!: number;
    public user_id!: number;
    public deal_id!: number;
    public contact_id!: number;
    public title!: string;
    public due_date!: Date;
    public status!: boolean;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static readonly publicAttributes: string[] = [
        "id", "user_id", "deal_id", "contact_id", "title", "due_date", "status", "created_at", "updated_at"
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
        },
        deal_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "deals" },
        },
        contact_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: "contacts" },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
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
    }
);

export default Task;
