import { Router } from 'express';
import { validateRequest } from '../../middleware/validation.middleware';
import productController from './product.controller';
import {
    productIdParamSchema,
    productListQuerySchema,
    productSearchQuerySchema,
} from './product.validation';

const router = Router();

router.get('/', validateRequest({ query: productListQuerySchema }), productController.getProducts);
router.get('/search', validateRequest({ query: productSearchQuerySchema }), productController.searchProducts);
router.get(
    '/category/:id',
    validateRequest({ params: productIdParamSchema, query: productListQuerySchema }),
    productController.getProductsByCategory
);
router.get(
    '/brand/:id',
    validateRequest({ params: productIdParamSchema, query: productListQuerySchema }),
    productController.getProductsByBrand
);
router.get(
    '/:id',
    validateRequest({ params: productIdParamSchema }),
    productController.getProductById
);

export default router;
