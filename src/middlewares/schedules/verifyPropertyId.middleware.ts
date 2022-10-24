import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Properties from "../../entities/properties.entity";
import { AppError } from "../../errors/appErrors";

const verifyPropertyId = async (req: Request, res: Response, next: NextFunction) => {

    try {
       
        const propertyId = req.params.id;
       
        const propertyRepository = AppDataSource.getRepository(Properties);
       
        const property = await propertyRepository.findOneBy({id: propertyId});
       
        if(!property){throw new AppError(404, "Not existing property")};
       
        next();

    } catch (error) {
        
        if(error instanceof AppError){
       
            return res.status(404).json({message: error.message});
       
        };

    }

}

export default  verifyPropertyId;