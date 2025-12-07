import { ITemplateRepository } from "../interfaces/template.interface";
import { Template } from "../models";

export class TemplateService {

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

}
