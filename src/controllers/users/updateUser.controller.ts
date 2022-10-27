import { Request, Response } from "express";
import updateUserService from "../../services/users/updateUser.service";
import { IUser, IUserUpdate } from "../../interfaces/users";

const updateUserController = async (req: Request, res: Response) => {

    try {
        
        const user: IUserUpdate = req.body;

        const id = req.params.id;
      
        const updatedUser = await updateUserService(user, id);

        if( typeof updatedUser === 'string'){

            return res.status(404).json({message: updatedUser});
            
        };

        return res.status(200).json(updatedUser);
    
    } catch (error) {

        if(error instanceof Error){

            return res.status(401).json({message: error.message});

        };

    };

};

export default updateUserController;