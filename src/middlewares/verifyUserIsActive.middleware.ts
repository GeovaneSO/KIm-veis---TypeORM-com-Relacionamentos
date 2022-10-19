import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import { AppError, handleError } from "../errors/appErrors";

const verifyIsActive = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({id});
       
        if(!user ){throw new AppError(404,'Invalid id')};

        if(!user?.isActive ){throw new AppError(400,'Inactive user')};
        next();
    } catch (error) {
        if(error instanceof AppError){
            handleError(error, res);
        }
    }
}
export default verifyIsActive;