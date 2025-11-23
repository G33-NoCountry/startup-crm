import { IContactRepository } from "../interfaces/contact.interface";

export class ContactService {

  constructor(private contactRepository: IContactRepository) { }

  public async getByPk(id: number) {
    return this.contactRepository.findById(id);
  }

  public async getUsers(limit: number | undefined, after?: string, before?: string, where?: any) {
    return this.contactRepository.findAll(limit, after, before, where);
  }

}
