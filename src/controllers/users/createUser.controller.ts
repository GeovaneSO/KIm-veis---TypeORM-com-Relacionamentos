import { IUser, IUserRequest } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";
import { AppError, handleError } from "../../Errors/appErrors";

const createUserController = async (req: Request, res: Response) => {
    // try {
        const user: IUserRequest= req.body;

        const newUser: IUser = await createUserService(user);

        return res.status(201).json(newUser);
    
    // } catch (error) {
       
    //     if(error instanceof AppError){
    //         handleError(error, res);
    //     }
    // };
};

export default createUserController;