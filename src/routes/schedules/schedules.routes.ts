import { Router } from "express";

import createSchedulesController from "../../controllers/schedules/createSchedules.controller";
import listSchedulesController from "../../controllers/schedules/listSchedules.controller";
import verifyPropertyId from "../../middlewares/schedules/verifyPropertyId.middleware";

import verifyAuthToken from "../../middlewares/user/verifyAuthToken.middleware";
import verifyIsAdm from "../../middlewares/user/verifyIsAdm.middleware";

const schedulesRouter = Router();

schedulesRouter.post('', verifyAuthToken, createSchedulesController);
schedulesRouter.get('/properties/:id', verifyAuthToken, verifyIsAdm, verifyPropertyId, listSchedulesController);

export default schedulesRouter;