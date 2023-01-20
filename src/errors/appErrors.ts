import { Response } from "express";

export class AppError extends Error {
    statusCode;
    time?: object;
    constructor(statusCode: number, message: string, time?: object){
        super()
        this.statusCode = statusCode
        this.message = message
        this.time = time
    };
};

export const handleError = (error: AppError, res: Response) => {
    const {statusCode, message} = error;
    return res.status(statusCode).json({
        status: 'error', 
        statusCode,
        message, 
        time: error.time
    });
};