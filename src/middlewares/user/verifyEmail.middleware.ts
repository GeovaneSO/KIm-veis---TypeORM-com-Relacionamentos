import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appErrors";

const verifyUserEmail = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userRepository = AppDataSource.getRepository(User);
    
        const users = await userRepository.find();
    
        const email = req.body.email;
    
        const emailAlreadyExists = users.find(user => user.email === email);
        
        if (emailAlreadyExists) {throw new AppError(400,"Email already exists")};
        
        next();

    }  catch (error){
        if(error instanceof AppError){
            return res.status(400).json({message: error.message});
        };
    };
};

export default verifyUserEmail;