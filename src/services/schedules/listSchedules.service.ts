import AppDataSource from "../../data-source";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import { AppError } from "../../errors/appErrors";

const listSchedulesService = async (id: string): Promise<Schedules_user_properties[]> => {
 
    const schedulesRepository = AppDataSource.getRepository(Schedules_user_properties);
    
    const schedules = await schedulesRepository.find({
        relations:{
            property: true,
            user: true
        },
        where: {
            property:{
                id: id
            }
        }
    });
 
    if(!schedules){throw new AppError(400, "error")};
    
    return schedules;

};

export default listSchedulesService;