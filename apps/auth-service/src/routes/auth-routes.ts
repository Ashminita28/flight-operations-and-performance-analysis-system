import { Router } from "express";
import {
	registerUser,
	loginUser,
	logoutUser,
	refreshToken,
} from "../controllers/auth-controller";

const authRouter: Router = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
