import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import { AppError } from "../../errors/appErrors";

const verifyDate = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const date = req.body.date;

        if(new Date(date).getDay() > 0 && new Date(date).getDay() <= 5){

            return  next();
            
        };
        
        throw new AppError(400, 'It is not a business day');

    } catch (error) {

        if (error instanceof AppError) {

            return res.status(400).json({message: error.message});

        };
    }
}

export default verifyDate;