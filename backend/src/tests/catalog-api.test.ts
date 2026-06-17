import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../app';

describe('Brand API', () => {
    it('returns all brands', async () => {
        const response = await request(app).get('/brands');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(3);
    });

    it('returns a brand by id', async () => {
        const response = await request(app).get('/brands/1');

        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe('Duracell');
    });

    it('returns 404 for a missing brand', async () => {
        const response = await request(app).get('/brands/999');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Brand not found');
    });
});

describe('Category API', () => {
    it('returns all categories', async () => {
        const response = await request(app).get('/category');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveLength(3);
    });

    it('returns a category by id', async () => {
        const response = await request(app).get('/category/2');

        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe('Rechargeable Batteries');
    });
});

describe('Product API', () => {
    it('returns paginated products', async () => {
        const response = await request(app).get('/products?page=1&limit=2');

        expect(response.status).toBe(200);
        expect(response.body.data.products).toHaveLength(2);
        expect(response.body.data.meta.total).toBe(6);
        expect(response.body.data.meta.hasNextPage).toBe(true);
    });

    it('returns a product by id with brand and category details', async () => {
        const response = await request(app).get('/products/1');

        expect(response.status).toBe(200);
        expect(response.body.data.name).toBe('Duracell AA Alkaline 4 Pack');
        expect(response.body.data.brand.name).toBe('Duracell');
        expect(response.body.data.category.name).toBe('Alkaline Batteries');
    });

    it('searches products', async () => {
        const response = await request(app).get('/products/search?q=coin');

        expect(response.status).toBe(200);
        expect(response.body.data.products).toHaveLength(1);
        expect(response.body.data.products[0].name).toContain('Coin Cell');
    });

    it('filters, sorts, and paginates product listings', async () => {
        const response = await request(app)
            .get('/products?brandId=3&minPrice=10&sortBy=price&sortOrder=asc');

        expect(response.status).toBe(200);
        expect(response.body.data.products).toHaveLength(2);
        expect(response.body.data.products[0].price).toBe(13.99);
        expect(response.body.data.products[1].price).toBe(16.99);
    });

    it('filters products by category route', async () => {
        const response = await request(app).get('/products/category/3');

        expect(response.status).toBe(200);
        expect(response.body.data.products).toHaveLength(2);
        expect(response.body.data.products.every((product: any) => product.categoryId === 3)).toBe(true);
    });

    it('filters products by brand route', async () => {
        const response = await request(app).get('/products/brand/1');

        expect(response.status).toBe(200);
        expect(response.body.data.products).toHaveLength(2);
        expect(response.body.data.products.every((product: any) => product.brandId === 1)).toBe(true);
    });

    it('validates search query input', async () => {
        const response = await request(app).get('/products/search');

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Validation failed');
    });
});

describe('OpenAPI docs', () => {
    it('exposes OpenAPI JSON for the catalog APIs', async () => {
        const response = await request(app).get('/api/docs.json');

        expect(response.status).toBe(200);
        expect(response.body.openapi).toBe('3.0.0');
        expect(response.body.paths['/products/search']).toBeDefined();
    });
});
