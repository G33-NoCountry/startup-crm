import { Contact } from "../../models";

export class ContactResource {
    static toResponse(contact: Contact) {
        return {
            id: contact.id,
            full_name: contact.full_name,
            email: contact.email,
            phone: contact.phone,
            created_at: contact.created_at,
            updated_at: contact.updated_at,
        };
    }
}
