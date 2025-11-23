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