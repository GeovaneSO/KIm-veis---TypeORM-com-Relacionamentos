import { Router } from "express";
import createSessionController from "../../controllers/sessions/sessions.controller";

const loginRouter = Router();

loginRouter.post('', createSessionController);

export default loginRouter;