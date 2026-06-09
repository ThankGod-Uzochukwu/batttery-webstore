export const brandSwagger = {
    '/brands': {
        get: {
            tags: ['Brands'],
            summary: 'List brands',
            responses: {
                200: {
                    description: 'Brands retrieved successfully',
                },
            },
        },
    },
    '/brands/{id}': {
        get: {
            tags: ['Brands'],
            summary: 'Get a brand by id',
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
                    description: 'Brand retrieved successfully',
                },
                404: {
                    description: 'Brand not found',
                },
            },
        },
    },
};
