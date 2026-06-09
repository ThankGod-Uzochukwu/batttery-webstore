import { brands } from '../../data/catalog';
import AppError from '../../utils/AppError';

export class BrandService {
    findAll () {
        return brands.filter(brand => brand.isActive);
    }

    findById (id: number) {
        const brand = brands.find(item => item.id === id && item.isActive);

        if (!brand)
        {
            throw new AppError(404, 'Brand not found');
        }

        return brand;
    }
}

export default new BrandService();
