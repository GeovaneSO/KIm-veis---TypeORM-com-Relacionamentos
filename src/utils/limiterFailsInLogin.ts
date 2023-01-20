import { Request, Response, NextFunction } from "express";
import { 
    getUsernameIPkey, 
    limiterConsecutiveFailsByUsername, 
    limiterConsecutiveFailsByUsernameAndIP, 
    limiterSlowBruteByIP, 
    maxConsecutiveFailsByUserName, 
    maxConsecutiveFailsByUserNameAndIP, 
    maxWrongAttemptsByIPperDay
} from "./dataRedis";
import { AppError, handleError } from "../errors/appErrors";
import { createSessionSerializer } from "../serializers";
import { User } from "../entities/user.entity";
import AppDataSource from "../data-source";
import bcrypt from 'bcrypt'


const loginBruteForce = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    const ip = req.ip;
   
    try {
        
        const serialized = await createSessionSerializer.validate(user, {
            abortEarly: true,
            stripUnknown: false
        });

        const usernameIPkey = getUsernameIPkey(serialized.email, ip);

        const [resUsernameAndIP, resSlowByIP] = await Promise.all([
            limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
            limiterSlowBruteByIP.get(ip),
        ]);
        
        let retrySecs = 0;
       
        // Check if IP or Username + IP is already blocked

         if(resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay){
            retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
           console.log(resSlowByIP);
                      
            const message = {
                message: `Tempo para sua conta ser liberada é ${retrySecs}`
            };
           
            throw new AppError(429, "Too Many Request", message)    
        }
        
        if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUserNameAndIP) {
            retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
        }
        
        if (retrySecs > 0 ){ 
            console.log(resUsernameAndIP);
            
            const message = {
                message: `Tempo para sua conta ser liberada é ${retrySecs}`
            };
            throw new AppError(429, "Too Many Request", message)  
        }
        
        const userRepository = AppDataSource.getRepository(User);
        
        const findUser = await userRepository.findOneBy({email: serialized.email});
       
        let passwordMatch = true
        
        if (findUser){
            passwordMatch = await bcrypt.compare(serialized.password, findUser.password);
        }
        
        if(!findUser || !passwordMatch) {
            console.log(resUsernameAndIP)
            console.log("aqui")
            // Consume 1 point from limiters on wrong attempt and block if limits reached

            try {

                const promises = [
                    limiterSlowBruteByIP.consume(ip),
                    limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey),
                ];

                await Promise.all(promises);

                const message = {message: `Faltam ${resUsernameAndIP?.remainingPoints}`}

                throw new AppError(400, 'email or password is wrong', message);

            } catch (error) {
                if(error instanceof AppError){
                    throw error;
                } 
                const message = {message: `Faltam ${resUsernameAndIP?.remainingPoints}`};
                
                throw new AppError(429,'Too Many Request', message );
            };
        };

        if(resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
            await limiterConsecutiveFailsByUsernameAndIP.delete(req.body.email);
        };

        return next();

    } catch (error) {
        if( error instanceof AppError) {
            handleError(error, res);
        };
    };
};

export default loginBruteForce;