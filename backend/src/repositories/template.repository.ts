import { IPaginate } from "../interfaces/paginate.interface";
import { ITemplateRepository } from "../interfaces/template.interface";
import { Template } from "../models";
import { toPaginate } from "../utils/paginate";

export class TemplateRepository implements ITemplateRepository {
    async findById(id: number) {
        return Template.findByPk(id);
    }

    async findAll(
        include?: any,
        where?: any
    ): Promise<Template[] | null> {
        const result = await Template.findAll({
            include: include,
            attributes: Template.publicAttributes,
            where,
            order: [['sort_order', 'ASC']],
        });

        if (!(result.length > 0))
            return null;

        return result;
    }

    async findAllPaginate(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<Template> | null> {
        const result = await Template.paginate({
            limit,
            after,
            before,
            order: [['id', 'ASC']],
            include: include,
            attributes: Template.publicAttributes,
            where,
        });

        if (!(result.edges.length > 0))
            return null;

        const paginate = toPaginate<Template>(result);
        return paginate;
    }

    async create(data: any): Promise<Template | null> {
        return Template.create(data);
    }

    async update(data: any): Promise<Template | null> {
        const result = await Template.update(data, {
            where: { id: data.id }
        });

        if (!(result.length > 0))
            return null;
        const TemplateUpdated = await this.findById(data.id);
        return TemplateUpdated;
    }

    async delete(Template: Template): Promise<void> {
        return Template.destroy();
    }
}
