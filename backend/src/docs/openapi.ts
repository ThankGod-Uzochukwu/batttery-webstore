import { brandSwagger } from '../modules/brands/brand.swagger';
import { categorySwagger } from '../modules/categories/category.swagger';
import { productSwagger } from '../modules/products/product.swagger';

export const openApiDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Battery Store API',
        version: '1.0.0',
        description: 'Brand, category, and product API documentation.',
    },
    servers: [
        {
            url: '/',
        },
    ],
    tags: [
        { name: 'Brands' },
        { name: 'Categories' },
        { name: 'Products' },
    ],
    paths: {
        ...brandSwagger,
        ...categorySwagger,
        ...productSwagger,
    },
};

export default openApiDocument;
