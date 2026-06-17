import { Router } from 'express';
import brandController from './brand.controller';
import { validateRequest } from '../../middleware/validation.middleware';
import { brandIdParamSchema } from './brand.validation';

const router = Router();

router.get('/', brandController.getBrands);
router.get(
    '/:id',
    validateRequest({ params: brandIdParamSchema }),
    brandController.getBrandById
);

export default router;
