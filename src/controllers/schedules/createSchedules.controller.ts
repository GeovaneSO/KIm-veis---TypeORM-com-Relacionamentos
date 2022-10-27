import { IScheduleRequest } from "./../../interfaces/schedules/index";
import { Request, Response } from "express";
import createSchedulesService from "../../services/schedules/createSchedules.Service";

const createSchedulesController = async (req: Request, res: Response) => {
    
    const schedules: IScheduleRequest = req.body;

    const userId = req.user.sub;

    const newSchedules = await createSchedulesService(schedules, userId);
 
    return res.status(201).json(newSchedules);

};

export default createSchedulesController;