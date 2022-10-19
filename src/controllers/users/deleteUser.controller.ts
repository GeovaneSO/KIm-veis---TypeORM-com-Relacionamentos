import { Request, Response } from "express";
import { AppError, handleError } from "../../Errors/appErrors";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
    // try {
        const id = req.params.id;

        const isActive = req.user.isActive;

        const deletedUser = await deleteUserService(id, isActive);

        return res.status(204).json(deletedUser);

    // } catch (error) {

    //     if(error instanceof AppError){
    //         handleError(error, res);
       
    //     };    
    // };
};

export default deleteUserController;