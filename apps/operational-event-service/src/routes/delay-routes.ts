import { Router } from "express";
import { DelayCategoryController } from "../controllers/delay-controller";
import { authenticate } from "@package/shared-middleware";

const delayRouter: Router = Router();
/**
 * @swagger
 * tags:
 *   name: DelayCategories
 *   description: Manage delay categories
 */

/**
 * @swagger
 * /api/delays:
 *   post:
 *     summary: Create a delay category
 *     tags: [DelayCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
delayRouter.post("/delays", authenticate, DelayCategoryController.create);

/**
 * @swagger
 * /api/delays:
 *   get:
 *     summary: List delay categories
 *     tags: [DelayCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of categories
 */
delayRouter.get("/delays", authenticate, DelayCategoryController.getAll);

/**
 * @swagger
 * /api/delays/{id}:
 *   delete:
 *     summary: Delete a delay category
 *     tags: [DelayCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted
 */
delayRouter.delete("/delays/:id", authenticate, DelayCategoryController.delete);

export default delayRouter;
