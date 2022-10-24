import { Request, NextFunction, Response } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError, handleError } from "../../errors/appErrors";

const verifyId = async (req: Request, res: Response, next: NextFunction) => {
    // try {
        const id = req.params.id;

        const userRepository = AppDataSource.getRepository(User);

        if(!id) {return res.status(404).json({message: 'Invalid Token'})};

        const user = await userRepository.findOneBy({id});
    console.log(id !== user?.id)
        if(id !== user?.id ){return res.status(404).json({message: 'Invalid id'})};

        next();  
    
    // } catch (error){
    //     if(error instanceof AppError){
    //         return res.status(404).json({message: 'Invalid Token'});
    //     };
    // };
};

export default verifyId;