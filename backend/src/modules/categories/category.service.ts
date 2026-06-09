import { categories } from '../../data/catalog';
import AppError from '../../utils/AppError';

export class CategoryService {
    findAll () {
        return categories.filter(category => category.isActive);
    }

    findById (id: number) {
        const category = categories.find(item => item.id === id && item.isActive);

        if (!category)
        {
            throw new AppError(404, 'Category not found');
        }

        return category;
    }
}

export default new CategoryService();
