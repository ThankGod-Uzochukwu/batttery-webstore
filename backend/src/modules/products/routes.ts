import { Router, Request, Response, NextFunction } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import AppError from '../utils/AppError';

const router = Router();

// Mock data - replace with database queries
const mockProducts = [
    { id: 1, name: 'Battery AA', price: '2.99', stock: 100 },
    { id: 2, name: 'Battery AAA', price: '1.99', stock: 150 },
    { id: 3, name: 'Battery 9V', price: '4.99', stock: 50 },
];

// GET all products
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try
    {
        sendSuccess(res, mockProducts, 'Products retrieved successfully');
    } catch (error)
    {
        next(error);
    }
});

// GET product by ID
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try
    {
        const { id } = req.params;
        const product = mockProducts.find(p => p.id === parseInt(id));

        if (!product)
        {
            throw new AppError(404, 'Product not found');
        }

        sendSuccess(res, product, 'Product retrieved successfully');
    } catch (error)
    {
        next(error);
    }
});

// POST create product
router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try
    {
        const { name, price, stock } = req.body;

        if (!name || !price)
        {
            throw new AppError(400, 'Name and price are required');
        }

        const newProduct = {
            id: mockProducts.length + 1,
            name,
            price,
            stock: stock || 0,
        };

        mockProducts.push(newProduct);
        sendSuccess(res, newProduct, 'Product created successfully', 201);
    } catch (error)
    {
        next(error);
    }
});

export default router;
