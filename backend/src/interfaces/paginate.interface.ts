import { ICrudBase } from "./crud-base.interface";

export interface IPaginate<T> {
    items: T[];
    total_count: number;
    paginate_info: {
        has_next: boolean;
        has_previous: boolean;
        next_cursor: string | null;
        prev_cursor: string | null;
    };
}

export interface IPaginatableRepository<T> extends ICrudBase<T> {
    findAllPaginate(
        limit: number | undefined,
        after?: string,
        before?: string,
        include?: any,
        where?: any
    ): Promise<IPaginate<T> | null>;
}
