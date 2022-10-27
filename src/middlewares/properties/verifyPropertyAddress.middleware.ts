import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Addresses from "../../entities/addresses.entity";
import { AppError } from "../../errors/appErrors";
import { IAddressRequest } from "../../interfaces/properties";

const verifyAddress = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
       
        const addressRepository = AppDataSource.getRepository(Addresses);
       
        const address: IAddressRequest = req.body.address;

        const addressFind = await addressRepository.findOneBy({number: address.number});

        if(addressFind){throw new AppError(400, "Existing property")};

        return next();

    } catch (error) {
       
        if(error instanceof AppError){
       
            return res.status(400).json({message: error.message});
       
        };
    };
};

export default verifyAddress;