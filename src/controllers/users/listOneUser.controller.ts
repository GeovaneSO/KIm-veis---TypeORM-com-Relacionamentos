import { IUser } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import listUserProfileService from "../../services/users/listUserProfile.service";
import { instanceToPlain } from "class-transformer";

const listOneUserController = async (req: Request, res: Response) => {

    const id: string = req.params.id;

        const user: IUser = await listUserProfileService(id);
      
        return res.status(200).json(instanceToPlain(user));

    };

export default listOneUserController;