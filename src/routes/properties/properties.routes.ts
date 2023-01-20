import { Router } from "express";

import createPropertyController from "../../controllers/properties/createProperty.controller";
import listPropertiesController from "../../controllers/properties/listProperties.controller";
import listPagination from "../../controllers/pagination/pagination.middleware";

import verifyCategoryId from "../../middlewares/properties/verifyCategoryId.middleware";

import verifyAddress from "../../middlewares/properties/verifyPropertyAddress.middleware";
import verifyState from "../../middlewares/properties/verifyState.middleware";
import verifyZipCode from "../../middlewares/properties/verifyZipCode.middleware";
import verifyAuthToken from "../../middlewares/user/verifyAuthToken.middleware";
import verifyIsAdm from "../../middlewares/user/verifyIsAdm.middleware";

const propertiesRouter = Router();

propertiesRouter.post('', verifyAuthToken, verifyIsAdm, verifyAddress, verifyState, verifyZipCode, verifyCategoryId, createPropertyController);
propertiesRouter.get('', listPropertiesController);
propertiesRouter.get('/pagination', listPagination);

export default propertiesRouter;