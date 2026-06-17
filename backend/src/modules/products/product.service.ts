import { brands, categories, Product, products } from '../../data/catalog';
import AppError from '../../utils/AppError';
import { Pagination } from '../../utils/pagination';
import { QueryFeatures } from '../../utils/queryFeatures';
import { ProductListQuery, ProductSearchQuery } from './product.validation';

export interface ProductView extends Product {
    brand: {
        id: number;
        name: string;
        slug: string;
    };
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

export class ProductService {
    findAll (query: ProductListQuery) {
        return this.buildList(query);
    }

    search (query: ProductSearchQuery) {
        return this.buildList({
            ...query,
            search: query.q || query.search,
        });
    }

    findById (id: number) {
        const product = this.getActiveProducts().find(item => item.id === id);

        if (!product)
        {
            throw new AppError(404, 'Product not found');
        }

        return this.withRelations(product);
    }

    findByCategory (categoryId: number, query: ProductListQuery) {
        const categoryExists = categories.some(category => category.id === categoryId && category.isActive);

        if (!categoryExists)
        {
            throw new AppError(404, 'Category not found');
        }

        return this.buildList({ ...query, categoryId });
    }

    findByBrand (brandId: number, query: ProductListQuery) {
        const brandExists = brands.some(brand => brand.id === brandId && brand.isActive);

        if (!brandExists)
        {
            throw new AppError(404, 'Brand not found');
        }

        return this.buildList({ ...query, brandId });
    }

    private buildList (query: ProductListQuery) {
        let filteredProducts = new QueryFeatures(this.getActiveProducts())
            .search(query.search, ['name', 'description', 'slug'])
            .filterBy('categoryId', query.categoryId)
            .filterBy('brandId', query.brandId)
            .filterRange('price', query.minPrice, query.maxPrice)
            .sortBy(query.sortBy, query.sortOrder)
            .getResults();

        if (query.inStock !== undefined)
        {
            filteredProducts = filteredProducts.filter(product => query.inStock ? product.stock > 0 : product.stock === 0);
        }

        const productsWithRelations = filteredProducts.map(product => this.withRelations(product));
        const paginated = Pagination.paginate(productsWithRelations, query.page, query.limit);

        return {
            products: paginated.items,
            meta: paginated.meta,
        };
    }

    private getActiveProducts () {
        return products.filter(product => product.isActive);
    }

    private withRelations (product: Product): ProductView {
        const brand = brands.find(item => item.id === product.brandId);
        const category = categories.find(item => item.id === product.categoryId);

        if (!brand || !category)
        {
            throw new AppError(500, 'Product relation is missing');
        }

        return {
            ...product,
            brand: {
                id: brand.id,
                name: brand.name,
                slug: brand.slug,
            },
            category: {
                id: category.id,
                name: category.name,
                slug: category.slug,
            },
        };
    }
}

export default new ProductService();
