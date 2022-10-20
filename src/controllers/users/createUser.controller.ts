import { IUser, IUserRequest } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {

    const user: IUserRequest= req.body;

        const newUser: IUser = await createUserService(user);

        return res.status(201).json(newUser);

    };

export default createUserController;