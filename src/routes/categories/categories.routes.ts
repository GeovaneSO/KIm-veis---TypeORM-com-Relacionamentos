import { Router } from "express";

import createCategoryController from "../../controllers/categories/createCategory.controllers";
import listCategoriesController from "../../controllers/categories/listCategories.controller";
import listPropertiesInCategoryController from "../../controllers/categories/listPropertiesInCategory.controller";

import verifyCategoryName from "../../middlewares/schedules/verifyName.middleware";
import verifyCategoryId from "../../middlewares/category/verifyCategoryId.middleware";

import verifyAuthToken from "../../middlewares/user/verifyAuthToken.middleware";
import verifyIsAdm from "../../middlewares/user/verifyIsAdm.middleware";

const categoriesRouter = Router();

categoriesRouter.post('', verifyAuthToken, verifyIsAdm, verifyCategoryName, createCategoryController);
categoriesRouter.get('', listCategoriesController);
categoriesRouter.get('/:id/properties', verifyCategoryId,listPropertiesInCategoryController);

export default categoriesRouter;