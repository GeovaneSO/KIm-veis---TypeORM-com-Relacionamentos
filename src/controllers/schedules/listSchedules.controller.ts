import { Request, Response } from "express";
import listSchedulesService from "../../services/schedules/listSchedules.service";

const listSchedulesController = async (req: Request, res: Response) => {

    const id = req.params.id;

    const listSchedules = await listSchedulesService(id);

    return res.status(200).json({schedules: listSchedules!});

}

export default listSchedulesController;