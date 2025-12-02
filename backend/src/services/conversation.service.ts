import { IConversationRepository } from "../interfaces/conversation.interface";
import { Conversation } from "../models";

export class ConversationService {

  constructor(private conversationRepository: IConversationRepository) { }

  public async getByPk(id: number) {
    return this.conversationRepository.findById(id);
  }

  public async getConversations(
    limit: number | undefined,
    after?: string,
    before?: string,
    include?: any,
    where?: any
  ) {
    return this.conversationRepository.findAllPaginate(limit, after, before, include, where);
  }

  public async create(data: any): Promise<Conversation | null> {
    return this.conversationRepository.create(data);
  }

  public async update(data: any): Promise<Conversation | null> {
    return this.conversationRepository.update(data);
  }

  public async delete(Conversation: Conversation): Promise<void> {
    return this.conversationRepository.delete(Conversation);
  }

}
