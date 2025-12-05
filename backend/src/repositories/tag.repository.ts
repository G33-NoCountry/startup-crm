import { ITagRepository } from "../interfaces/tag.interface";
import { Tag } from "../models";

export class TagRepository implements ITagRepository {
    async findById(id: number) {
        return Tag.findByPk(id);
    }

    async findAll(
        include?: any,
        where?: any
    ): Promise<Tag[] | null> {
        const result = await Tag.findAll({
            order: [['created_at', 'DESC']],
            include: include,
            attributes: Tag.publicAttributes,
        });

        if (!(result.length > 0))
            return null;

        return result;
    }

    async create(data: any): Promise<Tag | null> {
        return Tag.create(data);
    }

    async update(data: any): Promise<Tag | null> {
        const result = await Tag.update(data, {
            where: { id: data.id }
        });

        if (!(result.length > 0))
            return null;
        const tagUpdated = await this.findById(data.id);
        return tagUpdated;
    }

    async delete(tag: Tag): Promise<void> {
        return tag.destroy();
    }
}
