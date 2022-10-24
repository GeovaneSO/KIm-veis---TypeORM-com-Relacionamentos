import { Request, Response, NextFunction } from "express";
import createPropertyService from "../../services/properties/createProperty.service";

const createPropertyController = async (req: Request, res: Response, next: NextFunction) => {
    
    const property = req.body;

    const newProperty = await createPropertyService(property);

    return res.status(201).json(newProperty);

}

export default createPropertyController;
