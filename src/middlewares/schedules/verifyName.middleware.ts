import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { AppError, handleError } from "../../errors/appErrors";

const verifyCategoryName = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const categoryRepository = AppDataSource.getRepository(Categories);
        
        const name = req.body.name;

        const category = await categoryRepository.findOneBy({name});
        
        if(category){throw new AppError(400,"category already exists")};

        next();

    } catch (error) {

        if(error instanceof AppError){

            handleError(error, res);

        };
        
    };
     
};    

export default verifyCategoryName;