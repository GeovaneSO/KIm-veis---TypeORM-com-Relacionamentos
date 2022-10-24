import { Router } from "express";

import createUserController from "../../controllers/users/createUser.controller";
import deleteUserController from "../../controllers/users/deleteUser.controller";
import listOneUserController from "../../controllers/users/listOneUser.controller";
import listUsersController from "../../controllers/users/listUsers.controller";
import updateUserController from "../../controllers/users/updateUser.controller";

import verifyAuthToken from "../../middlewares/user/verifyAuthToken.middleware";
import verifyUserEmail from "../../middlewares/user/verifyEmail.middleware";
import verifyId from "../../middlewares/user/verifyId.middleware";
import verifyIsAdm from "../../middlewares/user/verifyIsAdm.middleware";
import verifyUserId from "../../middlewares/user/verifyUserId.middleware";
import verifyIsActive from "../../middlewares/user/verifyUserIsActive.middleware";

const userRouter = Router();

userRouter.post('', verifyUserEmail, createUserController);
userRouter.get('', verifyAuthToken, verifyIsAdm, listUsersController);
userRouter.get('/:id', verifyAuthToken, verifyIsAdm, verifyUserId, listOneUserController);
userRouter.patch('/:id', verifyAuthToken,  updateUserController);
userRouter.delete('/:id', verifyAuthToken, verifyIsAdm,  verifyIsActive, deleteUserController);

export default userRouter;