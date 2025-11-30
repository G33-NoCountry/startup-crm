import { IContactRepository } from "../interfaces/contact.interface";
import { IPaginate } from "../interfaces/paginate.interface";
import { Contact, Conversation } from "../models";
import { toPaginate } from "../utils/paginate";

export class ContactRepository implements IContactRepository {
    async findById(id: number) {
        return Contact.findByPk(id);
    }

    async findAll(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<Contact> | null> {
        const result = await Contact.paginate({
            limit,
            after,
            before,
            order: [['id', 'ASC']],
            include: include,
            attributes: Contact.publicAttributes,
            where,
        });

        if (!(result.edges.length > 0))
            return null;

        const paginate = toPaginate<Contact>(result);
        return paginate;
    }

    async createContact(data: any): Promise<Contact | null> {
        return Contact.create(data);
    }

    async updateContact(data: any): Promise<Contact | null> {
        const result = await Contact.update(data, {
            where: { id: data.id }
        });

        if (!(result.length > 0))
            return null;
        const contactUpdated = await this.findById(data.id);
        return contactUpdated;
    }

    async deleteContact(contact: Contact): Promise<void> {
        return contact.destroy();
    }

    async findConversationsByContactId(contactId: number): Promise<Conversation[] | null> {
        const conversations = await Conversation.findAll({
            where: {
                contact_id: contactId
            }
        });

        return conversations ?? null;
    }
}
