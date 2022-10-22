import { Router } from "express";

import createCategoryController from "../../controllers/categories/createCategory.controllers";
import listCategoriesController from "../../controllers/categories/listCategories.controller";
import listPropertiesInCategoryController from "../../controllers/categories/listPropertiesInCategory.controller";

import verifyCategoryName from "../../middlewares/category/verifyName.middleware";
import verifyAuthToken from "../../middlewares/user/verifyAuthToken.middleware";
import verifyIsAdm from "../../middlewares/user/verifyIsAdm.middleware";
import listPropertiesInCategoryService from "../../services/categories/listPropertiesInCategory.service";

const categoriesRouter = Router();

categoriesRouter.post('', verifyAuthToken, verifyIsAdm, verifyCategoryName, createCategoryController);
categoriesRouter.get('', listCategoriesController);
categoriesRouter.get('/:id/properties', listPropertiesInCategoryController);

export default categoriesRouter;