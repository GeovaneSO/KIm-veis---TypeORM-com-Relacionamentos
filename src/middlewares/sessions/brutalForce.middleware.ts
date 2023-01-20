import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import bcrypt from 'bcrypt'
import { createSessionSerializer } from "../../serializers";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/appErrors";
import { limiterConsecutiveFailsByUsername } from "../../utils/dataRedis";

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
    
        if(!findUser) {
            try {
                await limiterConsecutiveFailsByUsername.consume(serialized.email);
                throw new AppError(400, 'email or password is wrong')
                return res.status(400).end('email or password is wrong');
            } catch (error) {
                if(error instanceof AppError){
                    throw error;
                } 
                
                // res.set('Retry-After', String(Math.round(error.msBeforeNext / 1000)) );
                throw new AppError(429,'Too Many Request' )
                return res.status(429).json('Too Many Request');
            }
        };

        // if(rlResUsername !== null && rlResUsername.consumedPoints > 0) {
        //     await limiterConsecutiveFailsByUsername.delete(req.body.email);
        // }
        // return res.status(200).json(login);
    
        const passwordMatch = await bcrypt.compare(serialized.password, findUser!.password);
    
        if(!passwordMatch) {throw new AppError(403, 'Invalid email or password')};

        return next();
    
    } catch (error) {

        if(error instanceof AppError){

            return res.status(403).json({message: error})

        };

    };
};

export default verifyUser;