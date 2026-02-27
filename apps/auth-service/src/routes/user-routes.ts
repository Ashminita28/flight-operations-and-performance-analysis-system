import { Router } from "express";
import { authenticate } from "@package/shared-middleware";
import { getUserProfile } from "../controllers/user-controller";
const userRouter: Router = Router();

// profile
userRouter.get("/profile", authenticate, getUserProfile);

export default userRouter;
