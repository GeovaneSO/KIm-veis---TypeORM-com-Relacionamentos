import { Router } from "express";

import createSchedulesController from "../../controllers/schedules/createSchedules.controller";
import listSchedulesController from "../../controllers/schedules/listSchedules.controller";

import verifyDate from "../../middlewares/schedules/verifyDate.middleware";
import verifyDateOrHour from "../../middlewares/schedules/verifyDateOrHour.middleware";
import verifyHour from "../../middlewares/schedules/verifyHour.middleware";
import verifyIdSchedules from "../../middlewares/schedules/verifyIdSchedules.middleware";
import verifyPropertyId from "../../middlewares/schedules/verifyPropertyId.middleware";

import verifyAuthToken from "../../middlewares/user/verifyAuthToken.middleware";
import verifyIsAdm from "../../middlewares/user/verifyIsAdm.middleware";

const schedulesRouter = Router();

schedulesRouter.post('', verifyAuthToken, verifyHour, verifyDate,  verifyDateOrHour, createSchedulesController);
schedulesRouter.get('/properties/:id', verifyAuthToken, verifyIsAdm, verifyPropertyId, listSchedulesController);

export default schedulesRouter;