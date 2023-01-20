import { Request, Response } from "express";
import listPropertiesPagination  from "../../services/properties/listPropertiesPagination.Service";

const listPagination = async (req: Request, res: Response) => {
    
    const page = req.query.page?.toString() || "1";

    const products = await listPropertiesPagination(page);

    return res.status(200).json(products);

};

export default listPagination;