import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.config";
import {
    LazyPaginationConnection,
    makePaginate,
    makePaginateLazy,
    PaginateOptions,
    PaginationConnection
} from "sequelize-cursor-pagination";

class Contact extends Model {
    public id!: number;
    public full_name!: string;
    public email!: string;
    public phone!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    public static readonly publicAttributes: string[] = [
        "id", "full_name", "email", "phone", "created_at", "updated_at"
    ];

    declare static paginate: (options: PaginateOptions<Contact>) => Promise<PaginationConnection<Contact>>;
    declare static paginateLazy: (options: PaginateOptions<Contact>) => LazyPaginationConnection<Contact>;
}

Contact.paginate = makePaginate(Contact);
Contact.paginateLazy = makePaginateLazy(Contact);

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
        paranoid: true,
    }
);

export default Contact;
