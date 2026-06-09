import { NextFunction, Request, Response } from 'express';
import { sendSuccess } from '../../utils/response';
import productService from './product.service';
import { ProductIdParams, ProductListQuery, ProductSearchQuery } from './product.validation';

export class ProductController {
    getProducts (req: Request, res: Response, next: NextFunction) {
        try
        {
            const query = req.query as unknown as ProductListQuery;
            const products = productService.findAll(query);
            return sendSuccess(res, products, 'Products retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }

    searchProducts (req: Request, res: Response, next: NextFunction) {
        try
        {
            const query = req.query as unknown as ProductSearchQuery;
            const products = productService.search(query);
            return sendSuccess(res, products, 'Products retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }

    getProductById (req: Request, res: Response, next: NextFunction) {
        try
        {
            const { id } = req.params as unknown as ProductIdParams;
            const product = productService.findById(id);
            return sendSuccess(res, product, 'Product retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }

    getProductsByCategory (req: Request, res: Response, next: NextFunction) {
        try
        {
            const { id } = req.params as unknown as ProductIdParams;
            const query = req.query as unknown as ProductListQuery;
            const products = productService.findByCategory(id, query);
            return sendSuccess(res, products, 'Products retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }

    getProductsByBrand (req: Request, res: Response, next: NextFunction) {
        try
        {
            const { id } = req.params as unknown as ProductIdParams;
            const query = req.query as unknown as ProductListQuery;
            const products = productService.findByBrand(id, query);
            return sendSuccess(res, products, 'Products retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }
}

export default new ProductController();
