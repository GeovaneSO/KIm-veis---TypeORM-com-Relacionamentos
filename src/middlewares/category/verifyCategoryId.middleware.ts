import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { AppError } from "../../errors/appErrors";

const verifyCategoryId = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        
        const id =  req.params.id;
        
        const categoryRepository = AppDataSource.getRepository(Categories);
        
        const category = await categoryRepository.findOneBy({id: id});

        if(!category){throw new AppError(404, 'Category invalid')};
        
        return next();

    } catch (error) {

        if(error instanceof AppError){

            return res.status(404).json({message: error})

        };

    };

};

export default verifyCategoryId;