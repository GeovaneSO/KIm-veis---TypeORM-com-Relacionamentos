import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listUsersService from "../../services/users/listUsers.service";

const listUsersController = async (req: Request, res: Response) => {

    const listUser = await listUsersService();

        return res.status(200).json(instanceToPlain(listUser));

    };

export default listUsersController;