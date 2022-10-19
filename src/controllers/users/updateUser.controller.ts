import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";
import { IUser, IUserUpdate } from "../../interfaces/users";

const updateUserController = async (req: Request, res: Response) => {
    try {
        const user: IUserUpdate = req.body;

        const id = req.params.id;

        const tokenId = req.user.sub;

        const isAdm = req.user.isAdm;
      
        const updatedUser: IUser = await updateUserService(user, isAdm, id, tokenId);

        return res.status(200).json(updatedUser);
    
    } catch (error) {
        if(error instanceof Error){
            return res.status(401).json({message: error.message});
        };
    };
};

export default updateUserController;