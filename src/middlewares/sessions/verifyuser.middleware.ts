import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from 'bcrypt'
import { createSessionSerializer } from "../../serializers";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/appErrors";

const verifyUser = async (req: Request, res: Response, next: NextFunction) =>{
    let count = 0
    try {

        const user = req.body;

        const serialized = await createSessionSerializer.validate(user, {
            abortEarly: true,
            stripUnknown: false
        });
        
        const userRepository = AppDataSource.getRepository(User);

        const findUser = await userRepository.findOneBy({email: serialized.email});
    
        if(!findUser) {throw new AppError(403, "Account not found")};
    
        const passwordMatch = await bcrypt.compare(serialized.password, findUser.password);
    
        if(!passwordMatch) {throw new AppError(403, 'Invalid email or password')};

        return next();
    
    } catch (error) {

        if(error instanceof AppError){

            return res.status(403).json({message: error})

        };

    };
};

export default verifyUser;