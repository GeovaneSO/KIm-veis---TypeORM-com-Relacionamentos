import { Request, Response } from "express";
import listPropertiesService from "../../services/properties/listProperties.service";
import listPropertiesPagination from "../../services/properties/listPropertiesPagination.Service";
const listPropertiesController = async (req: Request, res: Response) => {

    const properties = await listPropertiesService();

    return res.status(200).json(properties);

};

export default listPropertiesController;