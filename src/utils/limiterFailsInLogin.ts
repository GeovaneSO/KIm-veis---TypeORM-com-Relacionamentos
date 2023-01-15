import { Request, Response, NextFunction } from "express";
import { limiterConsecutiveFailsByUsername, maxConsecutiveFailsByUserName } from "./dataRedis";
import { AppError, handleError } from "../errors/appErrors";
const loginBruteForce = async (req: Request, res: Response, next: NextFunction) => {

    const rlResUsername = await limiterConsecutiveFailsByUsername.get(req.body.email);
    const user = req.body
    try {
        if(rlResUsername !== null && rlResUsername.consumedPoints > maxConsecutiveFailsByUserName){
            const retrySecs = Math.round(rlResUsername.msBeforeNext / 1000) || 1;
            res.set('Retry-After', String(retrySecs));
            throw new AppError(429, "Too Many Request")    
        }

        
    } catch (error) {
        if( error instanceof AppError) {
            handleError(error, res)
        }
    }
}

export {loginBruteForce}