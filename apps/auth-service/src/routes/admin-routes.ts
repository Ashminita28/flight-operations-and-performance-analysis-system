import { Router } from "express";
import { adminController } from "../controllers/admin-controller";
import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";

const adminRouter: Router = Router();

adminRouter.get(
	"/users",
	authenticate,
	authorizeRole("Admin"),
	adminController,
);

export default adminRouter;
