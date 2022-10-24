import { Request, Response, NextFunction } from "express";
import listPropertiesInCategoryService from "../../services/categories/listPropertiesInCategory.service";

const listPropertiesInCategoryController = async (req: Request, res:Response, next: NextFunction) => {
   
    const id = req.params.id;
   
    const listProperties = await listPropertiesInCategoryService(id);

    return res.status(200).json(listProperties);

}
export default listPropertiesInCategoryController;