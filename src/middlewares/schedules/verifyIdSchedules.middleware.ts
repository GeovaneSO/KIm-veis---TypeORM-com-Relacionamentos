import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import { AppError } from "../../errors/appErrors";

const verifyIdSchedules = async (req: Request, res: Response, next: NextFunction) => {

    try {
      
        const propertyId = req.body.propertyId;
      
        const schedulesRepository = AppDataSource.getRepository(Schedules_user_properties)
      
        // const schedule = await schedulesRepository.findOneBy({property: });
      
        // const schedules = await schedulesRepository.find({
        //     relations: {
        //         user: true,
        //         property: true
        //     },             
        //     // where: {property: propertyId}
        // });

        const schedule = await schedulesRepository.findOneBy({
                property: {
                    id: propertyId
                }
        });

        if(schedule){throw new AppError(404, 'err')}
      
        return next();
    
    } catch (error) {
    
        if (error instanceof AppError) {
    
            return res.status(404).json({message: error.message});
    
        };
    }

}

export default verifyIdSchedules;