import { Router } from "express";
import checkPermission from "../middlewares/role-middleware";
import constants from "../utils/constants";
import { authenticate } from "../middlewares/auth-middleware";
import { getUserProfile } from "../controllers/user-controller";
import { checkRole } from "../middlewares/permission-middleware";
import Send from "../utils/response-utils";

const userRouter: Router = Router();

// profile
userRouter.get("/profile", authenticate, getUserProfile);

// manager dashboard
userRouter.get(
	"/manager/dashboard",
	authenticate,
	checkRole(constants.ROLE_MANAGEMENT),
	(req, res) => Send.success(res, null, "Manager dashboard"),
);

// analyst dashboard
userRouter.get(
	"/analyst/dashboard",
	authenticate,
	checkRole(constants.ROLE_ANALYST),
	(req, res) => Send.success(res, null, "Analyst dashboard"),
);

// operations dashboard
userRouter.get(
	"/operations/dashboard",
	authenticate,
	checkRole(constants.ROLE_OPERATIONS),
	(req, res) => Send.success(res, null, "Operations dashboard"),
);

export default userRouter;
