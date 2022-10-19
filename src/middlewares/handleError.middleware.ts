import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appErrors";

const handleErrorMiddleware = async(error: Error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return res.status(500).json({
        message: 'Internal server error'
    });
};

export default handleErrorMiddleware;