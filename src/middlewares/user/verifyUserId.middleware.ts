import { Request, NextFunction, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError, handleError } from "../../errors/appErrors";

const verifyUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const userRepository = AppDataSource.getRepository(User);

        if(!id){throw new AppError(401, 'Invalid Token')};

        const user = await userRepository.findOneBy({id});
    
        if(id !== user?.id ){throw new AppError(401, 'Invalid id')};

        next();  
    
    } catch (error){
        if(error instanceof AppError){
            handleError(error, res)
        };
    };
};

export default verifyUserId;