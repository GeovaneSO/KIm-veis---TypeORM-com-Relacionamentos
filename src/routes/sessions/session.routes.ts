import { Router } from "express";
import createSessionController from "../../controllers/sessions/sessions.controller";
import verifyUser from "../../middlewares/sessions/verifyuser.middleware";
import loginBruteForce from "../../utils/limiterFailsInLogin";

const loginRouter = Router();

loginRouter.post('', loginBruteForce ,verifyUser, createSessionController);

export default loginRouter;