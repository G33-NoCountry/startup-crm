import { IPaginate } from "./paginate.interface";

export interface ICrudBase<T> {
    findById(id: number): Promise<T | null>;
    findAll(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<T> | null>;
    create(data: any): Promise<T | null>;
    update(data: any): Promise<T | null>;
    delete(item: T): Promise<void>;
}