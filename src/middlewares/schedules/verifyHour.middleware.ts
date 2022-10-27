import { Request, Response, NextFunction } from "express";
import { AppError, handleError } from "../../errors/appErrors";

const verifyHour = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schedules = req.body;

        const hour = new Date(schedules.date + ", " + schedules.hour).getHours();

        if(hour >= 18 || hour < 8){throw new AppError(400, 'Outside opening hours')}

       return next();
    
    } catch (error) {

        if(error instanceof AppError){

            handleError(error, res)

        };
    }
}

export default verifyHour;