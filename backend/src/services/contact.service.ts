import { IContactRepository } from "../interfaces/contact.interface";
import { Contact, Conversation, Deal, FunnelStage } from "../models";

export class ContactService {

  constructor(private contactRepository: IContactRepository) { }

  public async getByPk(id: number) {
    return this.contactRepository.findById(id);
  }

  public async filterContactsByFunnelStageId(funnelStageId: number) {
    return await Contact.findAll({
      attributes: ["id"],
      include: [
        {
          model: Deal,
          as: "deals",
          attributes: [],
          required: true,
          include: [
            {
              model: FunnelStage,
              as: "funnel_stage",
              attributes: [],
              required: true,
              where: { id: funnelStageId }
            }
          ]
        },
      ]
    });
  }

  public async getContacts(
    limit: number | undefined,
    after?: string,
    before?: string,
    include?: any,
    where?: any
  ) {
    return this.contactRepository.findAllPaginate(limit, after, before, include, where);
  }

  // public async getContactsFilter(limit: number | undefined, after?: string, before?: string, where?: any) {
  //   return this.contactRepository.findAll(limit, after, before, where);
  // }

  public async create(data: any): Promise<Contact | null> {
    return this.contactRepository.create(data);
  }

  public async update(data: any): Promise<Contact | null> {
    return this.contactRepository.update(data);
  }

  public async delete(contact: Contact): Promise<void> {
    return this.contactRepository.delete(contact);
  }

  public async getConversationsByContactId(contactId: number): Promise<Conversation[] | null> {
    return this.contactRepository.findConversationsByContactId(contactId);
  }

}
