export type SortDirection = 'asc' | 'desc';

export class QueryFeatures<T extends Record<string, any>> {
    private result: T[];

    constructor (items: T[]) {
        this.result = [...items];
    }

    search (term: string | undefined, keys: Array<keyof T>) {
        if (!term)
        {
            return this;
        }

        const normalizedTerm = term.toLowerCase();

        this.result = this.result.filter(item => keys.some(key => {
            const value = item[key];
            return typeof value === 'string' && value.toLowerCase().includes(normalizedTerm);
        }));

        return this;
    }

    filterBy<K extends keyof T> (key: K, value: T[K] | undefined) {
        if (value === undefined)
        {
            return this;
        }

        this.result = this.result.filter(item => item[key] === value);
        return this;
    }

    filterRange<K extends keyof T> (key: K, min?: number, max?: number) {
        if (min === undefined && max === undefined)
        {
            return this;
        }

        this.result = this.result.filter(item => {
            const value = Number(item[key]);

            if (Number.isNaN(value))
            {
                return false;
            }

            return (min === undefined || value >= min) && (max === undefined || value <= max);
        });

        return this;
    }

    sortBy<K extends keyof T> (key: K, direction: SortDirection = 'asc') {
        const modifier = direction === 'asc' ? 1 : -1;

        this.result = [...this.result].sort((left, right) => {
            const leftValue = left[key];
            const rightValue = right[key];

            if (typeof leftValue === 'number' && typeof rightValue === 'number')
            {
                return (leftValue - rightValue) * modifier;
            }

            return String(leftValue).localeCompare(String(rightValue)) * modifier;
        });

        return this;
    }

    getResults () {
        return this.result;
    }
}
