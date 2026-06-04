import { Response } from 'express';

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export function sendSuccess<T> (
    res: Response,
    data: T,
    message = 'Success',
    statusCode = 200
) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    } as ApiResponse<T>);
}

export function sendError (
    res: Response,
    message = 'Error',
    statusCode = 500,
    error?: any
) {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error?.message || error,
    } as ApiResponse);
}

export default { sendSuccess, sendError };
