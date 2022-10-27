import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appErrors";

const verifyState = async (req: Request, res: Response, next: NextFunction) => {
    
    try {

        const state = req.body.address.state;
        
        if(state.length > 2){throw new AppError(400, "Misspelled state")};

        return next();

    } catch (error) {

        if(error instanceof AppError){
        
            return res.status(400).json({message: error.message});
        
        };
    };

};

export default verifyState;