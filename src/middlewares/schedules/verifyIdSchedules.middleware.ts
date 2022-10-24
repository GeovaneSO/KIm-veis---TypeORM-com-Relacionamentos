import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";

const verifyIdSchedules = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.id;
        const schedulesRepository = AppDataSource.getRepository(Schedules_user_properties);

    } catch (error) {
        
    }

}

export default verifyIdSchedules;