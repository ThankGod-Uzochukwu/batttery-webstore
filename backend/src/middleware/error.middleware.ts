import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import logger from '../config/logger';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Logging the error
    logger.error({
        statusCode: err.statusCode,
        message: err.message,
        stack: err.stack,
    });

    // Wrong MongoDB ID error
    if (err.name === 'CastError')
    {
        const message = `Resource not found. Invalid: ${ err.path }`;
        err = new AppError(400, message);
    }

    // JWT Token error
    if (err.name === 'JsonWebTokenError')
    {
        const message = 'JSON Web Token is invalid, Try again!';
        err = new AppError(401, message);
    }

    // JWT expired error
    if (err.name === 'TokenExpiredError')
    {
        const message = 'JSON Web Token is expired, Try again!';
        err = new AppError(401, message);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : undefined,
    });
};

export default errorHandler;
