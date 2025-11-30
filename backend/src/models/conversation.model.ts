import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import { makePaginate, PaginateOptions, PaginationConnection } from "sequelize-cursor-pagination";

class Conversation extends Model {
    public id!: number;
    public contact_id!: number;
    public status!: boolean;
    public channel!: 'whatsapp' | 'email';
    public last_interaction!: Date;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static readonly publicAttributes: string[] = [
        "id", "contact_id", "status", "channel", "last_interaction", "created_at", "updated_at"
    ];

    declare static paginate: (options: PaginateOptions<Conversation>) => Promise<PaginationConnection<Conversation>>;
}

Conversation.paginate = makePaginate(Conversation);

Conversation.init(
    {
        contact_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: { model: "contacts" },
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        channel: {
            type: DataTypes.ENUM('whatsapp', 'email'),
            allowNull: false,
        },
        last_interaction: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "conversations",
    }
);

export default Conversation;
