import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import { AppError } from "../../errors/appErrors";

const listSchedulesService = async (id: string): Promise<Schedules_user_properties[]> => {
 
    const schedulesRepository = AppDataSource.getRepository(Schedules_user_properties);
    
    const schedules = schedulesRepository.find();
    const propertyRepository = AppDataSource.getRepository(Properties);
       
    const property = propertyRepository.findOneBy({id: id});

    if(!property){throw new AppError(400, "error")}
    const schedulesFiltered = (await schedules).filter((schedule) => schedule.property === id)

    return schedulesFiltered;

}

export default listSchedulesService;