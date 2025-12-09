import { IContactRepository } from "../interfaces/contact.interface";
import { IPaginate } from "../interfaces/paginate.interface";
import { Contact, Conversation, sequelize, Tag } from "../models";
import ContactTag from "../models/contact-tag.model";
import { toPaginate } from "../utils/paginate";

export class ContactRepository implements IContactRepository {
    async findById(id: number) {
        return Contact.findByPk(id, {
            include: [
                {
                    model: Tag, as: "tags",
                    attributes: ["id", "title", "color"],
                    through: { attributes: [] },
                }
            ]
        });
    }

    async findAllPaginate(
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

    async findAll(
        include?: any,
        where?: any
    ): Promise<Contact[] | null> {
        const result = await Contact.findAll({
            order: [['id', 'ASC']],
            include: include,
            attributes: Contact.publicAttributes,
            where,
        });

        return result;
    }

    async create(data: any): Promise<Contact | null> {
        return Contact.create(data);
    }

    async update(data: any): Promise<Contact | null> {
        const transaction = await sequelize.transaction();

        try {
            const result = await Contact.update({
                full_name: data.full_name,
                email: data.email,
                phone: data.phone
            }, {
                where: { id: data.id }
            });

            if (!(result.length > 0))
                throw new Error("No se pudo actualizar el contacto");

            if (data.tags_id) {
                if (!await this.updateContactTags(data.id, data.tags_id))
                    throw new Error("No se pudo actualizar las tags");
            }

            const contactUpdated = await this.findById(data.id);
            await transaction.commit();

            return contactUpdated;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    private async updateContactTags(contactId: number, tagsId: number[]) {
        await ContactTag.destroy({
            where: { contact_id: contactId }
        });

        const results = await ContactTag.bulkCreate(
            tagsId.map(tagId => ({
                contact_id: contactId,
                tag_id: tagId
            }))
        );

        if (results.length > 0)
            return true
        return false;
    }

    async delete(contact: Contact): Promise<void> {
        return (contact as any).softDelete();
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
