import { IUserLogin } from "./../../interfaces/users/index";
import { Request, Response } from "express";
import userLoginService from "../../services/session/userSession.service";
const createSessionController = async (req: Request, res: Response) => {
    try{       
        const user: IUserLogin = req.body;
        const userLogin: object = await userLoginService(user);

        return res.status(200).json(userLogin);
        
    } catch(error){
        if(error instanceof Error){
            return res.status(403).json({message: error.message});
        };
    };
};
export default createSessionController;