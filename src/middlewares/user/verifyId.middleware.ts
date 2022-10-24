import { Request, NextFunction, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError, handleError } from "../../errors/appErrors";

const verifyId = async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;

        const userRepository = AppDataSource.getRepository(User);

        if(!id) {return res.status(404).json({message: 'Invalid Token'})};

        const user = await userRepository.findOneBy({id});

        if(id !== user?.id ){return res.status(404).json({message: 'Invalid id'})};

        next();  
    
};

export default verifyId;