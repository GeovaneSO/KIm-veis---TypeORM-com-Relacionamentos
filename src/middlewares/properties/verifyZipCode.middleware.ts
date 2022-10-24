import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/appErrors";

const verifyZipCode = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const zipCode = req.body.address.zipCode;

        if(zipCode.length > 8){throw new AppError(400, "Misspelled zip code")};

        next();

    } catch (error) {

        if (error instanceof AppError) {
            return res.status(400).json({message: error.message});
        };
    
    };

};

export default verifyZipCode;