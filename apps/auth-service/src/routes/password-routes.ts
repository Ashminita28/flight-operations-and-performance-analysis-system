import { Router } from "express";
import { forgotPassword, resetPassword } from "../controllers/auth-controller";

const passwordRouter: Router = Router();

passwordRouter.post("/forgot-password", forgotPassword);

passwordRouter.post("/reset-password", resetPassword);

export default passwordRouter;
