import { IUser } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import listUserProfileService from "../../services/users/listUserProfile.service";
import { instanceToPlain } from "class-transformer";
import { AppError, handleError } from "../../Errors/appErrors";

const listOneUserController = async (req: Request, res: Response) => {
    // try {
        const id: string = req.params.id;

        const user: IUser = await listUserProfileService(id);
      
        return res.status(200).json(instanceToPlain(user));
    // } catch (error) {

    //     if(error instanceof AppError){
    //         handleError(error, res);      
    //     };
    //  };
};

export default listOneUserController;