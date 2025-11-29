import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { makePaginate, PaginateOptions, PaginationConnection } from "sequelize-cursor-pagination";

class Message extends Model {
    public id!: number;
    public conversation_id!: number;
    public sender_type!: "User" | "Contact";
    public sender_id!: number;
    public content!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static readonly publicAttributes: string[] = [
        "id", "conversation_id", "sender_type", "sender_id", "content", "created_at", "updated_at"
    ];

    declare static paginate: (options: PaginateOptions<Message>) => Promise<PaginationConnection<Message>>;
}

Message.paginate = makePaginate(Message);

Message.init(
    {
        conversation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "conversations" },
        },
        sender_type: {
            type: DataTypes.ENUM("User", "Contact"),
            allowNull: false,
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "messages",
    }
);

export default Message;
