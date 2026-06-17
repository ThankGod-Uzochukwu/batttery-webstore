export const categorySwagger = {
    '/category': {
        get: {
            tags: ['Categories'],
            summary: 'List categories',
            responses: {
                200: {
                    description: 'Categories retrieved successfully',
                },
            },
        },
    },
    '/category/{id}': {
        get: {
            tags: ['Categories'],
            summary: 'Get a category by id',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'integer', minimum: 1 },
                },
            ],
            responses: {
                200: {
                    description: 'Category retrieved successfully',
                },
                404: {
                    description: 'Category not found',
                },
            },
        },
    },
};
