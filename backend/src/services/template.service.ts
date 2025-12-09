import { ITemplateRepository } from "../interfaces/template.interface";
import { Template } from "../models";
import { parseContent } from '../utils/placeholder.parser';
import { MailService } from './mail.service';

export class TemplateService {

  private mailService: MailService;

  // 2. MODIFICAR CONSTRUCTOR para aceptar e inicializar AMBAS dependencias
  constructor(
    private templateRepository: ITemplateRepository,
    mailService: MailService // Acepta MailService
  ) {
    this.mailService = mailService; // Asigna el servicio inyectado
  }

  public async getByPk(id: number) {
    return this.templateRepository.findById(id);
  }

  public async getTemplates(
    limit: number | undefined,
    after?: string,
    before?: string,
    include?: any,
    where?: any
  ) {
    return this.templateRepository.findAllPaginate(limit, after, before, include, where);
  }

  public async create(data: any): Promise<Template | null> {
    return this.templateRepository.create(data);
  }

  public async update(data: any): Promise<Template | null> {
    return this.templateRepository.update(data);
  }

  public async delete(template: Template): Promise<void> {
    return this.templateRepository.delete(template);
  }

  public async sendEmailByTemplate(
    templateId: number,
    toEmail: string,
    subject: string,
    contactData: any 
  ) {
    const template = await this.templateRepository.findById(templateId);
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`);
    }

    const parsedHtml = parseContent((template as any).content, { Contacto: contactData });

    return this.mailService.sendMail({
      to: toEmail,
      subject: subject,
      html: parsedHtml,
    });
  }

}
