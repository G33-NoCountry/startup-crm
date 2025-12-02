export interface ICrudBase<T> {
    findById(id: number): Promise<T | null>;
    findAll(
        include?: any,
        where?: any
    ): Promise<T[] | null>;
    create(data: any): Promise<T | null>;
    update(data: any): Promise<T | null>;
    delete(item: T): Promise<void>;
}