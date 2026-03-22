import { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	refreshToken,
} from "../controllers/auth-controller";
import { authenticate } from "@package/shared-middleware";
import { authorizeRole } from "@package/shared-middleware";

const authRouter: Router = Router();

authRouter.post(
	"/register",
	authenticate,
	authorizeRole("Admin"),
	registerUser,
);

authRouter.post("/login", loginUser);

authRouter.post("/refresh-token", refreshToken);

authRouter.post("/logout", authenticate, logoutUser);

export default authRouter;
