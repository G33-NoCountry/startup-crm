import { IContactRepository } from "../interfaces/contact.interface";
import { IPaginate } from "../interfaces/paginate.interface";
import { Contact } from "../models";
import { toPaginate } from "../utils/paginate";

export class ContactRepository implements IContactRepository {
    async findById(id: number) {
        return Contact.findByPk(id);
    }

    async findAll(limit: number | undefined, after?: string, before?: string, where?: any): Promise<IPaginate<Contact>> {
        const result = await Contact.paginate({
            limit,
            after,
            before,
            attributes: Contact.publicAttributes,
            where
        });

        const paginate = toPaginate<Contact>(result);
        return paginate;
    }

    async create() {
        return
    }
}
