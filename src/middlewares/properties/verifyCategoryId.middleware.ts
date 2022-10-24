import { Request, Response, NextFunction } from "express";
import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entity";
import { AppError } from "../../errors/appErrors";

const verifyCategoryId = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const categoryId = req.body.categoryId;
     
        const categoryRepository = AppDataSource.getRepository(Categories);
     
        const category = await categoryRepository.findOneBy({id: categoryId});

        if(!category){throw new AppError(404, "Existing property")}

        next();

    } catch (error) {

        if(error instanceof AppError){
       
            return res.status(404).json({message: error.message});
       
        };

    }

}

export default verifyCategoryId;