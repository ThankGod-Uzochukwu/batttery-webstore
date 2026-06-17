import { NextFunction, Request, Response } from 'express';
import { sendSuccess } from '../../utils/response';
import categoryService from './category.service';
import { CategoryIdParams } from './category.validation';

export class CategoryController {
    getCategories (req: Request, res: Response, next: NextFunction) {
        try
        {
            const categories = categoryService.findAll();
            return sendSuccess(res, categories, 'Categories retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }

    getCategoryById (req: Request, res: Response, next: NextFunction) {
        try
        {
            const { id } = req.params as unknown as CategoryIdParams;
            const category = categoryService.findById(id);
            return sendSuccess(res, category, 'Category retrieved successfully');
        } catch (error)
        {
            return next(error);
        }
    }
}

export default new CategoryController();
