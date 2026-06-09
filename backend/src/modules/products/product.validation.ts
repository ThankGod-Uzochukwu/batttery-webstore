import { z } from 'zod';

const booleanQuerySchema = z.preprocess(value => {
    if (value === 'true')
    {
        return true;
    }

    if (value === 'false')
    {
        return false;
    }

    return value;
}, z.boolean());

export const productIdParamSchema = z.object({
    id: z.coerce.number().int().positive(),
});

const productListQueryBaseSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().min(1).optional(),
    categoryId: z.coerce.number().int().positive().optional(),
    brandId: z.coerce.number().int().positive().optional(),
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    inStock: booleanQuerySchema.optional(),
    sortBy: z.enum(['name', 'price', 'stock', 'createdAt']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

const validatePriceRange = (query: { minPrice?: number; maxPrice?: number }) => {
    if (query.minPrice === undefined || query.maxPrice === undefined)
    {
        return true;
    }

    return query.minPrice <= query.maxPrice;
};

const priceRangeValidationOptions = {
    message: 'minPrice cannot be greater than maxPrice',
    path: ['minPrice'],
};

export const productListQuerySchema = productListQueryBaseSchema.refine(
    validatePriceRange,
    priceRangeValidationOptions
);

export const productSearchQuerySchema = productListQueryBaseSchema.extend({
    q: z.string().trim().min(1).optional(),
})
    .refine(validatePriceRange, priceRangeValidationOptions)
    .refine(query => Boolean(query.q || query.search), {
        message: 'q or search query parameter is required',
        path: ['q'],
    });

export type ProductIdParams = z.infer<typeof productIdParamSchema>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
export type ProductSearchQuery = z.infer<typeof productSearchQuerySchema>;
