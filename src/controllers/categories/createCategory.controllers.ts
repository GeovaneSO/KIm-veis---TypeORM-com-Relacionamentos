import { Request, Response, NextFunction } from "express";
import createCategoryService from "../../services/categories/createCategory.service";

const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
 
    const category = req.body;
 
    const newCategory = await createCategoryService(category);

    return res.status(201).json(newCategory);

}
export default createCategoryController;