import { Router } from 'express';
import categoryController from './category.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { categoryIdParamSchema } from './category.validation';

const router = Router();

router.get('/', categoryController.getCategories);
router.get(
    '/:id',
    validateRequest({ params: categoryIdParamSchema }),
    categoryController.getCategoryById
);

export default router;
