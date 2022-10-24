import { Router } from "express";
import createSchedulesController from "../../controllers/schedules/createSchedules.controller";
import verifyAuthToken from "../../middlewares/user/verifyAuthToken.middleware";

const schedulesRouter = Router();

schedulesRouter.post('', verifyAuthToken, createSchedulesController);
schedulesRouter.get('/properties/:id',)

export default schedulesRouter;