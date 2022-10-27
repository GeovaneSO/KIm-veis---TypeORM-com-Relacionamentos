import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import { User } from "../../entities/user.entity";
import { ISchedule, IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async (schedules: IScheduleRequest, userId: string): Promise<object> => {

    const scheduleRepository = AppDataSource.getRepository(Schedules_user_properties);
    const propertyRepository = AppDataSource.getRepository(Properties);
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({id: userId});

    const property = await propertyRepository.findOneBy({id: schedules.propertyId});

    const newSchedules = new Schedules_user_properties();

    newSchedules.date = schedules.date;
    newSchedules.hour = schedules.hour;
    newSchedules.user = user!;
    
    if(property){
        newSchedules.property = property;
    };

    await scheduleRepository.save(newSchedules);
 
    const message = {message: 'scheduled visit'};

    return message;
}

export default createSchedulesService;