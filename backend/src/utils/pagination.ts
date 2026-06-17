export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface PaginatedResult<T> {
    items: T[];
    meta: PaginationMeta;
}

export class Pagination {
    static paginate<T> (items: T[], page = 1, limit = 10): PaginatedResult<T> {
        const total = items.length;
        const totalPages = Math.max(Math.ceil(total / limit), 1);
        const start = (page - 1) * limit;
        const end = start + limit;

        return {
            items: items.slice(start, end),
            meta: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1,
            },
        };
    }
}
