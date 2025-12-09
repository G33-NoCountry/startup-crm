import { ITemplateRepository } from "../interfaces/template.interface";
import { Template } from "../models";
import { parseContent } from '../utils/placeholder.parser';
export class TemplateService {
  mailService: any;

  constructor(private templateRepository: ITemplateRepository) { }

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
    contactData: any // Datos del contacto para el placeholder
  ) {
    // 1. Obtener la plantilla (asegúrate de que el método getByPk funcione)
    const template = await this.templateRepository.findById(templateId);

    if (!template) {
      throw new Error(`Plantilla con ID ${templateId} no encontrada.`);
    }

    // 2. Comprobación de canal (Asumo que el modelo Template tiene una propiedad 'channel')
    if ((template as any).channel !== 'Email') {
      throw new Error('La plantilla seleccionada no es de tipo Email.');
    }

    // 3. Parsear el contenido: [Contacto.Nombre] -> Valor real
    // Aquí encapsulamos los datos bajo la clave 'Contacto' para que el parser funcione
    const parsedHtml = parseContent((template as any).content, { Contacto: contactData });

    // 4. Enviar el correo
    return this.mailService.sendMail({
      to: toEmail,
      subject: subject,
      html: parsedHtml,
    });
  }

}
