import { IUserLogin } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import userLoginService from "../../services/session/userSession.service";

const createSessionController = async (req: Request, res: Response) => {

    const user: IUserLogin = req.body;

    const userLogin: object = await userLoginService(user);

    return res.status(200).json(userLogin);

};

export default createSessionController;