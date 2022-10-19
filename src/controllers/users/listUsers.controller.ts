import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../Errors/appErrors";
import listUsersService from "../../services/users/listUsers.service";

const listUsersController = async (req: Request, res: Response) => {
    // try {
        const listUser = await listUsersService();

        return res.status(200).json(instanceToPlain(listUser));
  
    // } catch (error) {

    //     if(error instanceof AppError){
    //         handleError(error, res)
  
    //     };
    //  };
};

export default listUsersController;