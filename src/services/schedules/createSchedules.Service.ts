import AppDataSource from "../../data-source";
import Schedules_user_properties from "../../entities/schedules_user_properties.entity";
import { ISchedule, IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async (schedules: IScheduleRequest, userId: string): Promise<ISchedule> => {

    const scheduleRepository = AppDataSource.getRepository(Schedules_user_properties);
  
    schedules.userId = userId
  
    const date = new Date(schedules.date)

    const hour = date.getHours()
    
    const newSchedules = new Schedules_user_properties();

    newSchedules.date = date;
    newSchedules.hour = date;
    newSchedules.user = userId;
    newSchedules.property = schedules.propertyId

    await scheduleRepository.save(newSchedules)
    
    const {} = schedules
    return newSchedules;
}

export default createSchedulesService;