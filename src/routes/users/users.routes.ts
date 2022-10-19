import { Router } from "express";

import createUserController from "../../controllers/users/createUser.controller";
import deleteUserController from "../../controllers/users/deleteUser.controller";
import listOneUserController from "../../controllers/users/listOneUser.controller";
import listUsersController from "../../controllers/users/listUsers.controller";
import updateUserController from "../../controllers/users/updateUser.controller";

import verifyAuthToken from "../../middlewares/verifyAuthToken.middleware";
import verifyUserEmail from "../../middlewares/verifyEmail.middleware";
import verifyIsAdm from "../../middlewares/verifyIsAdm.middleware";
import verifyUserId from "../../middlewares/verifyUserId.middleware";
import verifyIsActive from "../../middlewares/verifyUserIsActive.middleware";

const userRouter = Router();

userRouter.post('', verifyUserEmail, createUserController);
userRouter.get('', verifyAuthToken, verifyIsAdm, listUsersController);
userRouter.get('/:id', verifyAuthToken, verifyIsAdm, verifyUserId, listOneUserController);
userRouter.patch('/:id', verifyAuthToken, verifyUserId, updateUserController);
userRouter.delete('/:id', verifyAuthToken, verifyIsAdm, verifyIsActive, deleteUserController);

export default userRouter;