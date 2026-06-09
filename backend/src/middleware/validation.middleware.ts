import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

type RequestPart = 'body' | 'query' | 'params';

type ValidationSchema = Partial<Record<RequestPart, ZodSchema>>;

export const validateRequest = (schema: ValidationSchema) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const requestParts: RequestPart[] = ['params', 'query', 'body'];

    for (const part of requestParts)
    {
        const validator = schema[part];

        if (!validator)
        {
            continue;
        }

        const result = validator.safeParse(req[part]);

        if (!result.success)
        {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: result.error.flatten(),
            });
        }

        Object.defineProperty(req, part, {
            value: result.data,
            writable: true,
            enumerable: true,
            configurable: true,
        });
    }

    return next();
};

export default validateRequest;
