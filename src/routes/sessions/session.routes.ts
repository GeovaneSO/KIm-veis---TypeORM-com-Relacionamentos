import { Router } from "express";
import createSessionController from "../../controllers/sessions/sessions.controller";
import verifyUser from "../../middlewares/sessions/verifyuser.middleware";

const loginRouter = Router();

loginRouter.post('', verifyUser, createSessionController);

export default loginRouter;