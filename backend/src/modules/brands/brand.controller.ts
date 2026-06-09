import { NextFunction, Request, Response } from 'express';
import { sendSuccess } from '../../utils/response';
import brandService from './brand.service';
import { BrandIdParams } from './brand.validation';

export class BrandController {
    getBrands (req: Request, res: Response, next: NextFunction) {
        try
        {
            const brands = brandService.findAll();
            return sendSuccess(res, brands, 'Brands retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }

    getBrandById (req: Request, res: Response, next: NextFunction) {
        try
        {
            const { id } = req.params as unknown as BrandIdParams;
            const brand = brandService.findById(id);
            return sendSuccess(res, brand, 'Brand retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }
}

export default new BrandController();
