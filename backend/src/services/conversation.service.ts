import { IConversationRepository } from "../interfaces/conversation.interface";
import { IMessageRepository } from "../interfaces/message.interface"; 
import { MailService } from "./mail.service";
import { Conversation, Contact, Message } from "../models";
import { WhatsAppApiService } from "./whatsapp-api.service";

export class ConversationService {

  constructor(
    private conversationRepository: IConversationRepository,
    private messageRepository: IMessageRepository, 
    private mailService: MailService,
    private whatsAppService: WhatsAppApiService,
  ) { }

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

  public async delete(conversation: Conversation): Promise<void> {
    return this.conversationRepository.delete(conversation);
  }

  public async sendMessage(
    conversationId: number,
    userId: number,
    content: string,
    channel: 'email' | 'whatsapp'
  ): Promise<Message> {


    const conversation = await this.conversationRepository.findById(conversationId, {
      include: [{ model: Contact, as: 'contact' }]
    });

    if (!conversation) {
      throw new Error("La conversación no existe.");
    }

    const contact = (conversation as any).contact;

    if (!contact) {
      throw new Error("Esta conversación no tiene un contacto asociado.");
    }

    if (channel === 'email') {
      if (!contact.email) {
        throw new Error("El contacto no tiene un correo electrónico registrado.");
      }

      await this.mailService.sendMail({
        to: contact.email, 
        subject: `Nuevo mensaje en la conversación #${conversation.id}`,
        html: `<p>${content}</p>`
      });

    } else if (channel === 'whatsapp') {
      // Aquí iría la integración con Twilio/Meta.
      // Por ahora validamos que tenga teléfono.
      this.whatsAppService.sendMessage("Texto de prueba");
      if (!contact.phone) {
        throw new Error("El contacto no tiene un teléfono registrado.");
      }
      console.log(`[WhatsApp Mock] Enviando a ${contact.phone}: ${content}`);
    }

    const savedMessage = await this.messageRepository.create({
      conversation_id: conversationId,
      sender_type: 'User', 
      sender_id: userId,   
      content: content,
      channel: channel
    });

    if (!savedMessage) {
      throw new Error("El mensaje se envió, pero hubo un error al guardarlo en la base de datos.");
    }

    return savedMessage;
  }
}