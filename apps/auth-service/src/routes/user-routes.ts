import { Router } from "express";
import checkPermission from "../middlewares/role-middleware";
import constants from "../utils/constants";
import { authenticate } from "../middlewares/auth-middleware";
import { getUserProfile } from "../controllers/user-controller";

const userRouter: Router = Router();

userRouter.get(
	"/users/manager",
	authenticate,
	checkPermission(constants.ROLE_MANAGEMENT),
	getUserProfile,
);
userRouter.get(
	"/users/analyst",
	authenticate,
	checkPermission(constants.ROLE_ANALYST),
	getUserProfile,
);
userRouter.get(
	"/users/operation-staff",
	authenticate,
	checkPermission(constants.ROLE_OPERATIONS),
	getUserProfile,
);

export default userRouter;
