import { Router } from "express";
import { forgotPassword, resetPassword } from "../controllers/auth-controller";

const passwordRouter: Router = Router();

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Send OTP to email
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: OTP sent
 */

passwordRouter.post("/auth/forgot-password", forgotPassword);

/**
 * @swagger
 * /password/reset-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Password]
 *     responses:
 *       200:
 *         description: Password reset successful
 */

passwordRouter.post("/auth/reset-password", resetPassword);

export default passwordRouter;
