const paginationParameters = [
    { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
    { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 10 } },
    { name: 'sortBy', in: 'query', schema: { type: 'string', enum: ['name', 'price', 'stock', 'createdAt'], default: 'createdAt' } },
    { name: 'sortOrder', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'], default: 'desc' } },
];

const productFilterParameters = [
    ...paginationParameters,
    { name: 'search', in: 'query', schema: { type: 'string' } },
    { name: 'categoryId', in: 'query', schema: { type: 'integer', minimum: 1 } },
    { name: 'brandId', in: 'query', schema: { type: 'integer', minimum: 1 } },
    { name: 'minPrice', in: 'query', schema: { type: 'number', minimum: 0 } },
    { name: 'maxPrice', in: 'query', schema: { type: 'number', minimum: 0 } },
    { name: 'inStock', in: 'query', schema: { type: 'boolean' } },
];

const idPathParameter = {
    name: 'id',
    in: 'path',
    required: true,
    schema: { type: 'integer', minimum: 1 },
};

export const productSwagger = {
    '/products': {
        get: {
            tags: ['Products'],
            summary: 'List products with filtering, sorting, and pagination',
            parameters: productFilterParameters,
            responses: {
                200: { description: 'Products retrieved successfully' },
            },
        },
    },
    '/products/search': {
        get: {
            tags: ['Products'],
            summary: 'Search products',
            parameters: [
                { name: 'q', in: 'query', schema: { type: 'string' } },
                ...productFilterParameters,
            ],
            responses: {
                200: { description: 'Products retrieved successfully' },
                400: { description: 'Search term is required' },
            },
        },
    },
    '/products/{id}': {
        get: {
            tags: ['Products'],
            summary: 'Get a product by id',
            parameters: [idPathParameter],
            responses: {
                200: { description: 'Product retrieved successfully' },
                404: { description: 'Product not found' },
            },
        },
    },
    '/products/category/{id}': {
        get: {
            tags: ['Products'],
            summary: 'List products by category',
            parameters: [idPathParameter, ...productFilterParameters],
            responses: {
                200: { description: 'Products retrieved successfully' },
                404: { description: 'Category not found' },
            },
        },
    },
    '/products/brand/{id}': {
        get: {
            tags: ['Products'],
            summary: 'List products by brand',
            parameters: [idPathParameter, ...productFilterParameters],
            responses: {
                200: { description: 'Products retrieved successfully' },
                404: { description: 'Brand not found' },
            },
        },
    },
};
