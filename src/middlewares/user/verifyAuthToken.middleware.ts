import { handleError } from "../../errors/appErrors";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appErrors";

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if(!token){throw new AppError(401,'Invalid Token' )};
        
        token = token.split(' ')[1];
        
        jwt.verify(token, '' + process.env.SECRET_KEY, (error, decoded: any) => {
            if(error){throw new AppError(401, 'Invalid Token')};
            
            req.user = decoded;

            next();
        });

    } catch(error){

        if(error instanceof AppError){

            handleError(error, res)

        };
    };
};

export default verifyAuthToken;