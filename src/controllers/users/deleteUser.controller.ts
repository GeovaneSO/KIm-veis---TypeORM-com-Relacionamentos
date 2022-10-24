import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {

    const id = req.params.id;

        const isActive = req.user.isActive;

        const deletedUser = await deleteUserService(id, isActive);

        return res.status(204).json(deletedUser);

    };

export default deleteUserController;