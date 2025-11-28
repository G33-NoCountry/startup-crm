import { IMessageRepository } from "../interfaces/message.interface";
import { Message } from "../models";

export class MessageService {

  constructor(private messageRepository: IMessageRepository) { }

  public async getByPk(id: number) {
    return this.messageRepository.findById(id);
  }

  public async getMessagesByConversations(
    limit: number | undefined,
    after?: string,
    before?: string,
    include?: any,
    where?: any
  ) {
    return this.messageRepository.findAll(limit, after, before, include, where);
  }

  public async create(data: any): Promise<Message | null> {
    return this.messageRepository.create(data);
  }

  public async update(data: any): Promise<Message | null> {
    return this.messageRepository.update(data);
  }

  public async delete(message: Message): Promise<void> {
    return this.messageRepository.delete(message);
  }

}
