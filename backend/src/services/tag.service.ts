import { ITagRepository } from "../interfaces/tag.interface";
import { Tag } from "../models";

export class TagService {

  constructor(private tagRepository: ITagRepository) { }

  public async getByPk(id: number) {
    return this.tagRepository.findById(id);
  }

  public async getTags(
    include?: any,
    where?: any
  ) {
    return this.tagRepository.findAll(include, where);
  }

  public async create(data: any): Promise<Tag | null> {
    return this.tagRepository.create(data);
  }

  public async update(data: any): Promise<Tag | null> {
    return this.tagRepository.update(data);
  }

  public async delete(tag: Tag): Promise<void> {
    return this.tagRepository.delete(tag);
  }

}
